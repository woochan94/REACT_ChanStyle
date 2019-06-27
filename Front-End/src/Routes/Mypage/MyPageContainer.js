import React, { useState, useEffect } from "react"; 
import MyPagePresenter from "./MyPagePresenter"; 
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from './../../Components/SharedQueries';
import useInput from "../../Hooks/useInput";
import { EDIT_PROFILE } from './MyPageQueries';
import { toast } from "react-toastify";

export default () => {
    const { loading, data } = useQuery(ME, {
        fetchPolicy:"no-cache"
    }); 

    const [delay, setDelay] = useState(false)

    const [tab, setTab] = useState("cart");
    const [open, setOpen] = useState(false);

    const name = useInput(""); 
    const email = useInput(""); 
    const password = useInput(""); 
    const confirmPassword = useInput("");
    const zipCode = useInput("");  
    const address = useInput(""); 
    const addressDetail = useInput("");
    const phone1 = useInput(""); 
    const phone2 = useInput("");
    const phone3 = useInput(""); 

    const editProfileMutation = useMutation(EDIT_PROFILE, {
        variables: {
            name: name.value, 
            zipCode: zipCode.value, 
            address: address.value, 
            addressDetail: addressDetail.value,
            phone: phone1.value + "-" + phone2.value + "-" + phone3.value, 
            password: password.value,
            confirmPassword: confirmPassword.value
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setDelay(true)
        }, 1000);
    }, [])

    useEffect(() => {
        if(loading === false && delay) {
            const fullPhone = data.me.phone.split("-");
            name.setValue(data.me.name);
            email.setValue(data.me.email);
            zipCode.setValue(data.me.zipCode);
            address.setValue(data.me.address);
            addressDetail.setValue(data.me.addressDetail);
            phone1.setValue(fullPhone[0]); 
            phone2.setValue(fullPhone[1]);
            phone3.setValue(fullPhone[2]);
            setDelay(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading,delay])

    const handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        zipCode.setValue(data.zonecode);
        address.setValue(fullAddress);
        addressDetail.setValue("");
    }


    const clickTab = (tabString) => {
        setTab(tabString);
    }

    const onSubmit = async e => {
        e.preventDefault(); 

        if(
            name.value !== "" && 
            zipCode.value !== "" && 
            address.value !== "" && 
            addressDetail.value !== "" && 
            phone1.value !== "" &&
            phone2.value !== "" &&
            phone3.value !== ""
        ) {
            if(password !== "") {
                if(password.value !== confirmPassword.value) {
                    toast.error("비밀번호가 일치하지 않습니다.");
                    return false;
                }
            }

            try {
                const { data:edit } = await editProfileMutation();
                if(edit) {
                    toast.success("개인정보가 성공적으로 수정되었습니다!");
                }
            } catch (e) {
                toast.error(e.message);
            }
        }
    }

    return (
        <MyPagePresenter 
            tab={tab}
            clickTab={clickTab}
            onSubmit={onSubmit}
            name={name}
            email={email}
            password={password} 
            confirmPassword={confirmPassword}
            zipCode={zipCode}
            address={address}
            addressDetail={addressDetail}
            phone1={phone1.setValue}
            phone2={phone2}
            phone3={phone3}
            open={open}
            setOpen={setOpen}
            handleAddress={handleAddress}
            data={data}
        />
    )
}
import React, { useState, useEffect } from "react"; 
import MyPagePresenter from "./MyPagePresenter"; 
import { useQuery } from "react-apollo-hooks";
import { ME } from './../../Components/SharedQueries';
import useInput from "../../Hooks/useInput";

export default () => {
    const { loading, data } = useQuery(ME); 

    const [tab, setTab] = useState("cart");
    const [open, setOpen] = useState(false);

    const name = useInput(""); 
    const email = useInput(""); 
    const password = useInput(""); 
    const confirmPasword = useInput("");
    const zipCode = useInput("");  
    const address = useInput(""); 
    const addressDetail = useInput("");
    const phone1 = useInput(""); 
    const phone2 = useInput("");
    const phone3 = useInput(""); 


    useEffect(() => {
        if(loading === false) {
            const fullPhone = data.me.phone.split("-");
            name.setValue(data.me.name);
            email.setValue(data.me.email);
            zipCode.setValue(data.me.zipCode);
            address.setValue(data.me.address); 
            addressDetail.setValue(data.me.addressDetail);
            phone1.setValue(fullPhone[0]); 
            phone2.setValue(fullPhone[1]);
            phone3.setValue(fullPhone[2]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading])

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

    const onSubmit = e => {
        e.preventDefault(); 

        console.log("submit");
    }



    return (
        <MyPagePresenter 
            tab={tab}
            clickTab={clickTab}
            onSubmit={onSubmit}
            name={name}
            email={email}
            password={password} 
            confirmPasword={confirmPasword}
            zipCode={zipCode}
            address={address}
            addressDetail={addressDetail}
            phone1={phone1.setValue}
            phone2={phone2}
            phone3={phone3}
            open={open}
            setOpen={setOpen}
            handleAddress={handleAddress}
        />
    )
}
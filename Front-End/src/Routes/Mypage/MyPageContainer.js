import React, { useState, useEffect } from "react"; 
import MyPagePresenter from "./MyPagePresenter"; 
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from './../../Components/SharedQueries';
import useInput from "../../Hooks/useInput";
import { EDIT_PROFILE, SEE_CART, DELETE_CART, SEE_BUYLIST } from './MyPageQueries';
import { toast } from "react-toastify";

export default () => {
    // 자신의 정보를 가져오는 query 
    const { loading, data } = useQuery(ME, {
        fetchPolicy:"no-cache"
    }); 

    // tab메뉴 state 
    const [tab, setTab] = useState("cart");
    
    // 개인정보에 관련된 state값 
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
    const [open, setOpen] = useState(false);
        // 개인정보를 변경한후 변경정보를 얻어오기 위한 delay 
    const [delay, setDelay] = useState(false);
    
    // cart에 관련된 state값 
    const [cartId, setCartId] = useState(""); 
    
    const [count, setCount] = useState([]); 
    const [totalarr, setTotalarr] = useState([]);
    const [total, setTotal] = useState(0);

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

    const {loading:cartLoading, data:cartData, refetch} = useQuery(SEE_CART, {
        fetchPolicy: "network-only"
    });
 
    const deleteCartMutation = useMutation(DELETE_CART, {
        variables: {
            id: cartId
        }
    });

    const seeBuyListMutation = useMutation(SEE_BUYLIST,{});

    useEffect(() => {
        setTimeout(() => {
            setDelay(true);
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

    const passCartId = async (id) => {
        setCartId(id);
    }

    useEffect(() => {
        const deleteCartFunc = async () => {
            const { data } = await deleteCartMutation(); 
            if(data) {
                refetch();
            }
        }
        if(cartId !== "") {
            deleteCartFunc();
            setCartId("");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartId])

    const allCheck = (checked) => {
        if(checked) {
            if(cartLoading === false) {
                cartData.seeCart.map((item,index) => {
                    const chkBox = document.getElementById(item.id);
                    return chkBox.checked = true;
                })
            }
        } else {
            if(cartLoading === false) {
                cartData.seeCart.map((item) => {
                    const chkBox = document.getElementById(item.id);
                    return chkBox.checked = false;
                })
            }
        }
    }

    const totalFunc = (a,b) => a + b;

    useEffect(() => {
        const countTemp = []; 
        const totalarrTemp = [];
        const totalTemp = [];
        if(cartLoading === false) {
            cartData.seeCart.map(item => (
                countTemp.push(item.count)
            )); 
            setCount([...countTemp]);
            cartData.seeCart.map(item => (
                item.product.map(product => (
                    totalarrTemp.push(product.price)
                ))
            ));
            setTotalarr([...totalarrTemp]);
            countTemp.map((count,index) => (
                totalTemp.push(count*totalarrTemp[index])
            ));
            setTotal(totalTemp.reduce(totalFunc));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartData])
    
    const cartCountUp = (i) => {
        count.splice(i, 1, count[i]+1); 
        setCount([...count]);
    }

    const cartCountDown = (i) => {
        if(count[i] > 1) {
            count.splice(i, 1, count[i]-1); 
            setCount([...count]);
        }
    }

    useEffect(() => {
        if (cartLoading === false) {
            const totalarrTemp = [];
            const countTemp = [];
            count.map((item) => (
                countTemp.push(item)
            ));

            cartData.seeCart.map((item, index) => (
                item.product.map(product => (
                    totalarrTemp.push(countTemp[index] * product.price)
                ))
            ))
            setTotalarr([...totalarrTemp]);
            if (totalarrTemp.length !== 0) {
                setTotal(totalarrTemp.reduce(totalFunc));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    const selectOrder = () => {
        cartData.seeCart.map((item,index) => {
            const chkBox = document.getElementById(item.id);
            if(chkBox.checked === true) {
                console.log(item);
                console.log("count : " + count[index] + " totalarr : " + totalarr[index]);
            }
        })
    }

    const [buyData, setBuyData] = useState();

    useEffect(() => {
        if(tab === "buyList") {
            const seeBuyListFunc = async () => {
                const { data } = await seeBuyListMutation();
                setBuyData(data);
            }
            seeBuyListFunc();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab])

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
            cartLoading={cartLoading}
            cartData={cartData}
            passCartId={passCartId}
            allCheck={allCheck}
            total={total}
            cartCountUp={cartCountUp}
            cartCountDown={cartCountDown}
            count={count}
            selectOrder={selectOrder}
            buyData={buyData}
        />
    )
}
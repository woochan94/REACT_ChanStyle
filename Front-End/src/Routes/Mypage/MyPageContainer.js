import React, { useState, useEffect } from "react";
import MyPagePresenter from "./MyPagePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from './../../Components/SharedQueries';
import useInput from "../../Hooks/useInput";
import { EDIT_PROFILE, SEE_CART, DELETE_CART, SEE_BUYLIST, BUYLIST_QUERY, LOG_OUT } from './MyPageQueries';
import { toast } from "react-toastify";
import { ADD_PAYMENT } from './../Product/ProductQueries';

export default ({history}) => {
    // tab
    const [tab, setTab] = useState("cart");
    const clickTab = (tabString) => {
        setTab(tabString);
    }
    

    // 장바구니 
    const [cartId, setCartId] = useState("");
    const [count, setCount] = useState([]);
    const [totalarr, setTotalarr] = useState([]);
    const [total, setTotal] = useState(0);
    // 총 합계를 구하기 위한 식 (array.reduce에서 사용됨)
    const totalFunc = (a, b) => a + b;

    let productArray = [];
    let sizeIdArray = [];
    let colorIdArray = [];
    let stockIdArray = [];
    let countArray = [];
    let cartArray = []; 

    const { loading: cartLoading, data: cartData, refetch } = useQuery(SEE_CART, {fetchPolicy: "network-only", fetchResults: true});

    const deleteCartMutation = useMutation(DELETE_CART, {
        variables: {
            id: cartId
        }
    });

    const addPaymentMutation = useMutation(ADD_PAYMENT, {
        variables: {
            product: productArray,
            size: sizeIdArray,
            color: colorIdArray,
            stock: stockIdArray,
            count: countArray, 
            cart: cartArray
        }
    })

    useEffect(() => {
        const countTemp = [];
        const totalarrTemp = [];
        const totalTemp = [];
        if (cartLoading === false) {
            cartData.seeCart.map(item => (
                item.count.map(cnt => (
                    countTemp.push(cnt.count)
                ))
            ));
            setCount([...countTemp]);
            cartData.seeCart.map(item => (
                item.product.map(product => (
                    totalarrTemp.push(product.price)
                ))
            ));
            setTotalarr([...totalarrTemp]);
            countTemp.map((count, index) => (
                totalTemp.push(count * totalarrTemp[index])
            ));
            if(totalTemp.length === 0) {
                setTotal(0);
            } else {
                setTotal(totalTemp.reduce(totalFunc));
            }
            //
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartLoading, cartData])

    const cartCountUp = (i) => {
        count.splice(i, 1, count[i] + 1);
        setCount([...count]);
    }

    const cartCountDown = (i) => {
        if (count[i] > 1) {
            count.splice(i, 1, count[i] - 1);
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

    // 장바구니에서 상품을 삭제하기 위해 생성
    // => 클릭한 상품의 Id 값을 받아와서 cartId에 set해줌 
    const passCartId = async (id) => {
        setCartId(id);
    }

    // passcartId함수가 실행되면 cartId의 값이 setting 되고 해당 hook(useEffect)이 실행됨 
    useEffect(() => {
        const deleteCartFunc = async () => {
            const { data } = await deleteCartMutation();
            if (data) {
                refetch();
            }
        }
        if (cartId !== "") {
            deleteCartFunc();
            setCartId("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartId])

    const allCheck = (checked) => {
        if (checked) {
            if (cartLoading === false) {
                cartData.seeCart.map((item) => {
                    const chkBox = document.getElementById(item.id);
                    return chkBox.checked = true;
                })
            }
        } else {
            if (cartLoading === false) {
                cartData.seeCart.map((item) => {
                    const chkBox = document.getElementById(item.id);
                    return chkBox.checked = false;
                })
            }
        }
    }

    let isChecked = false; 

    const selectOrder = async () => {
        cartData.seeCart.map(async (item, index) => {
            const chkBox = document.getElementById(item.id);
            if (chkBox.checked === true) {
                isChecked = true;
                return (
                    productArray.push(item.product[0].id),
                    sizeIdArray.push(item.sizeId[0].id),
                    colorIdArray.push(item.colorId[0].id),
                    stockIdArray.push(item.stockId[0].id), 
                    countArray.push(count[index]), 
                    cartArray.push(item.id)
                )
            }
        })
        if(isChecked) {
            const { data } = await addPaymentMutation(); 
            if(data) {
                productArray = []; 
                sizeIdArray = [];
                colorIdArray = [];
                stockIdArray = [];
                countArray = [];
                cartArray = [];
                setTimeout(() => history.push('/payment'), 1000);
            }
        }
        if(isChecked === false) {
            alert("주문할 상품을 선택하여 주세요");
        }
    }



    // 구매 목록 
    const [buyData, setBuyData] = useState("");
    // 페이징을 위한 초기 first, skip 값 
    const first = 1;
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState();
    const [totalPage, setTotalpage] = useState(0);

    const { loading: buyListLoading, data: BuyListData } = useQuery(BUYLIST_QUERY);

    const seeBuyListMutation = useMutation(SEE_BUYLIST, {
        variables: {
            first,
            skip
        }
    });

    const changePage = (value) => {
        setPage(value - 1);
        setSkip((value - 1) * first);
    }

    // page의 값이 바뀔때마다 구매목록 페이지를 가져온다. 
    // page 값은 changePage 함수가 실행 된 후 바뀌게 되며, 
    // changePage 함수에서 skip의 값이 바뀌고 그 후에 seeBuyListFunc()이 실행되기 때문에 
    // 페이징 효과를 가져올 수 있음 
    useEffect(() => {
        seeBuyListFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const seeBuyListFunc = async () => {
        const { data } = await seeBuyListMutation();
        setBuyData(data);
    }


    useEffect(() => {
        if (tab === "buyList") {
            seeBuyListFunc();
            if (buyListLoading === false) {
                setTotalpage(Math.ceil(BuyListData.seeBuyList.length / first));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab])


    // 개인정보 수정 
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

    // 자신의 정보를 가져오는 query 
    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    });

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

    // loading과 delay 값이 바뀔 때마다 실행됨 
    // 개인정보 수정에서 기존의 정보를 미리 setting 해 두기 위한 코드 
    // delay가 있는 이유는 정보를 성공적으로 수정한 직후에 
    // Form의 input에 있는 값들을 수정된 정보로 보여주기 위함 
    useEffect(() => {
        if (loading === false && delay) {
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
    }, [loading, delay])

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

    const onSubmit = async e => {
        e.preventDefault();

        if (
            name.value !== "" &&
            zipCode.value !== "" &&
            address.value !== "" &&
            addressDetail.value !== "" &&
            phone1.value !== "" &&
            phone2.value !== "" &&
            phone3.value !== ""
        ) {
            if (password !== "") {
                if (password.value !== confirmPassword.value) {
                    toast.error("비밀번호가 일치하지 않습니다.");
                    return false;
                }
            }

            try {
                const { data: edit } = await editProfileMutation();
                if (edit) {
                    toast.success("개인정보가 성공적으로 수정되었습니다!");
                }
            } catch (e) {
                toast.error(e.message);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setDelay(true);
        }, 500);
    }, [data])

    // 로그아웃 
    const logOut = useMutation(LOG_OUT);

    return (
        <MyPagePresenter
            tab={tab}
            clickTab={clickTab}
            cartLoading={cartLoading}
            cartData={cartData}
            passCartId={passCartId}
            allCheck={allCheck}
            total={total}
            cartCountUp={cartCountUp}
            cartCountDown={cartCountDown}
            count={count}
            selectOrder={selectOrder}
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
            buyData={buyData}
            BuyListData={BuyListData}
            pageNum={totalPage}
            buyListLoading={buyListLoading}
            changePage={changePage}
            logOut={logOut}
            totalarr={totalarr}
        />
    )
}
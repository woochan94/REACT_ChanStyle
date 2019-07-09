import React, { useState, useEffect } from "react";
import PaymentPresenter from "./PaymentPresenter";
import { SEE_PAYMENT, EDIT_STOCK, EDIT_NUMBEROFSALES, ADD_BUYLIST } from './PaymentQueries';
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from './../../Components/SharedQueries';
import { DELETE_CART } from './../Mypage/MyPageQueries';

export default ({history}) => {
    let IMP = window.IMP;
    IMP.init(process.env.REACT_APP_IMP_CODE);

    const { loading, data } = useQuery(SEE_PAYMENT, {fetchPolicy: "network-only"});
    const { loading:meLoading, data:meData } = useQuery(ME);

    const [total, setTotal] = useState(0);
    const [name, setName] = useState(""); 
    const [zipCode, setZipcode] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [addressDetail, setAddressDetail] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [complete, setComplete] = useState(false); 

    const totalFunc = (a, b) => a + b;

    const [payProductName, setPayProductName] = useState("");
    useEffect(() => {
        if (loading === false) {
            const countTemp = [];
            const totalarrTemp = [];
            const totalTemp = [];
            data.seePayment.map(item => {
                item.product.map(product => (
                    totalarrTemp.push(product.price)
                ))
                item.count.map(count => (
                    countTemp.push(count.count)
                ))
                return null;
            })
            countTemp.map((count, index) => (
                totalTemp.push(count * totalarrTemp[index])
            ))
            if (totalTemp.length === 0) {
                setTotal(0);
            } else {
                setTotal(totalTemp.reduce(totalFunc));
            }
            if(data.seePayment.length > 1) {
                setPayProductName(data.seePayment[0].product[0].name+ " 외 " + (data.seePayment.length-1) + "개") 
            } else {
                if(loading === false && data && data.seePayment.length === 1) {
                    setPayProductName(data.seePayment[0].product[0].name)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, data])

    useEffect(() => {
        if(meLoading === false) {
            setName(meData.me.name);
            setZipcode(meData.me.zipCode); 
            setAddress(meData.me.address);
            setAddressDetail(meData.me.addressDetail);
            setEmail(meData.me.email);
            setPhone(meData.me.phone);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[meLoading])

    let stockId = []; 
    let stockCount = [];
    let numberOfSalesTemp = [];
    let productIdTemp = [];
    let sizeTemp = [];
    let colorTemp = [];
    let quantityTemp = [];
    let cartId = [];


    const editStockMutation = useMutation(EDIT_STOCK, {
        variables: {
            id: stockId, 
            stock: stockCount
        }
    })

    const editNumberOfSalesMutation = useMutation(EDIT_NUMBEROFSALES, {
        variables: {
            id: productIdTemp, 
            saleCount: numberOfSalesTemp
        }
    })

    const addBuyListMutation = useMutation(ADD_BUYLIST, {
        variables: {
            product: productIdTemp, 
            size: sizeTemp, 
            color: colorTemp, 
            quantity: quantityTemp
        }
    })

    const deleteCartMutation = useMutation(DELETE_CART, {
        variables: {
            id: cartId
        }
    })

    const deleteCartFunction = async () => {
        const { data } = await deleteCartMutation(); 
        if(data) {
            stockId = []; 
            stockCount = [];
            numberOfSalesTemp = [];
            productIdTemp = [];
            sizeTemp = [];
            colorTemp = [];
            quantityTemp = [];
            cartId = [];
            setComplete(true);
        }
    }

    // 구매목록 추가 
    const addBuyListFunction = async () => {
        const { data } = await addBuyListMutation();
        if (data) {
            // payment 제거, 장바구니 제거 
            // => payment는 다른페이지로 이동하면 제거 됨 
            // => 장바구니 에서 아이템 제거하고 구매완료페이지로 이동 
            if(cartId.length !== 0) {
                deleteCartFunction();
            } else {
                stockId = []; 
                stockCount = [];
                numberOfSalesTemp = [];
                productIdTemp = [];
                sizeTemp = [];
                colorTemp = [];
                quantityTemp = [];
                cartId = [];
                setComplete(true);
            }

        }
    }

    // 판매량 증가 
    const editNumberFunction = async () => {
        const { data } = await editNumberOfSalesMutation(); 
        if (data) {
            addBuyListFunction();
        }
    }


    // 재고량 감소 
    const editStockFunction = async () => {
        const { data } = await editStockMutation();
        if (data) { 
            editNumberFunction();
        }
    }

    const openPay = async () => {
        IMP.request_pay({
            pg : 'html5_inicis',
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : payProductName,
            amount : 1000, // total
            buyer_email : email,
            buyer_name : name,
            buyer_tel : phone,
            buyer_addr : address + " " + addressDetail,
            buyer_postcode : zipCode
        }, function(rsp) {
            let msg = '결제가 완료되었습니다.';
            if ( rsp.success ) {
                // 결제가 완료되면 구매수량만큼 재고에서 감소시킨다. 
                data.seePayment.map(async (item) => {
                    productIdTemp.push(item.product[0].id);
                    numberOfSalesTemp.push(item.product[0].numberOfSales + item.count[0].count);
                    stockId.push(item.stock[0].id);
                    stockCount.push(item.stock[0].stock - item.count[0].count);
                    sizeTemp.push(item.size[0].id);
                    colorTemp.push(item.color[0].id);
                    quantityTemp.push(item.count[0].count);
                    if(item.cart.length !== 0) {
                        cartId.push(item.cart[0].id);
                    }
                })
                editStockFunction();
            } else {
                msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
                alert(msg);
            }

        });
    }

    const goHome = () => {
        history.push('/');
    }


    return (
        <PaymentPresenter
            paymentData={data}
            paymentLoading={loading}
            total={total}
            name={name}
            zipCode={zipCode}
            address={address}
            addressDetail={addressDetail}
            email={email}
            phone={phone}
            openPay={openPay}
            complete={complete}
            goHome={goHome}
        />
    )
}
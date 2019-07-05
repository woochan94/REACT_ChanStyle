import React, { useState, useEffect } from "react";
import PaymentPresenter from "./PaymentPresenter";
import { SEE_PAYMENT } from './PaymentQueries';
import { useQuery } from "react-apollo-hooks";
import { ME } from './../../Components/SharedQueries';

export default () => {
    let IMP = window.IMP;
    IMP.init(process.env.REACT_APP_IMP_CODE);

    const { loading, data } = useQuery(SEE_PAYMENT);
    const { loading:meLoading, data:meData } = useQuery(ME);

    const [total, setTotal] = useState(0);
    const [name, setName] = useState(""); 
    const [zipCode, setZipcode] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [addressDetail, setAddressDetail] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState(""); 

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
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

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

    const openPay = () => {
        IMP.request_pay({
            pg : 'html5_inicis',
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : payProductName,
            amount : total,
            buyer_email : email,
            buyer_name : name,
            buyer_tel : phone,
            buyer_addr : address + " " + addressDetail,
            buyer_postcode : zipCode
        }, function(rsp) {
            let msg = '결제가 완료되었습니다.';
            if ( rsp.success ) {
                msg += '고유ID : ' + rsp.imp_uid;
                msg += '상점 거래ID : ' + rsp.merchant_uid;
                msg += '결제 금액 : ' + rsp.paid_amount;
                msg += '카드 승인번호 : ' + rsp.apply_num;
            } else {
                msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
            }
        
            alert(msg);
        });
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
        />
    )
}
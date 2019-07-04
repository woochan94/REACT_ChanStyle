import React from "react";
import PaymentPresenter from "./PaymentPresenter";
import { SEE_PAYMENT } from './PaymentQueries';
import { useQuery } from "react-apollo-hooks";


export default () => {

    const { loading, data } = useQuery(SEE_PAYMENT);

    if(loading === false) {
        console.log(data);
    }

    return (
        <PaymentPresenter />
    )
}
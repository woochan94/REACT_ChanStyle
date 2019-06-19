import React from "react";
import DaumPostcode from 'react-daum-postcode';

export default ({ isOpen, handleAddress }) => {

    let dialog = (<DaumPostcode onComplete={handleAddress} autoClose={true} />)

    if(!isOpen) {
        dialog = null; 
    }
    return (
        <>
            {dialog}
        </>
    )
}
import React from "react";
import PostCode from "./DaumPostCode";

export default ({ isOpen, handleAddress }) => {

    let dialog = (<PostCode onComplete={handleAddress} autoClose={true} />)

    if(!isOpen) {
        dialog = null; 
    }
    return (
        <>
            {dialog}
        </>
    )
}
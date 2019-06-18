import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";

export default () => {
    // 회원가입, 로그인 등의 상태를 관리하기 위한 react hook 
    const [ action, setAction ] = useState("logIn");

    
    return (
        <AuthPresenter 
            action={action} 
            setAction={setAction} 
        />
    )
}
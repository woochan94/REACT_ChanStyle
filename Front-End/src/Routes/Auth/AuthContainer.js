import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";

export default () => {
    // 회원가입, 로그인 등의 상태를 관리하기 위한 react hook 
    const [ action, setAction ] = useState("logIn");
    // 입력값을 받아오기 위해서 useInput hook을 사용함 
    const name = useInput(""); 
    const email = useInput(""); 
    const password = useInput("");
    const confirmPassword = useInput("");  

    return (
        <AuthPresenter 
            action={action} 
            setAction={setAction} 
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
        />
    )
}
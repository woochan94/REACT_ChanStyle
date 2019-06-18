import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, LOCAL_LOG_IN } from './AuthQueries';

export default () => {
    // 회원가입, 로그인 등의 상태를 관리하기 위한 react hook 
    const [ action, setAction ] = useState("logIn");
    // 입력값을 받아오기 위해서 useInput hook을 사용함 
    const name = useInput(""); 
    const email = useInput(""); 
    const password = useInput("");
    const confirmPassword = useInput("");  

    const logInMutation = useMutation(LOG_IN, {
        variables: {
            email: email.value,
            password: password.value
        }
    }); 

    const localLogInMutation = useMutation(LOCAL_LOG_IN);

    const onSubmit = async e => {
        e.preventDefault(); 
        if( action === "logIn") {
            if(email !== "" && password !== "") {
                try {
                    // logInMutation으로 부터 token 값을 얻어옴 
                    const { data: { login : token }} = await logInMutation();
                    if (token !== "" && token !== undefined) {
                        // token 값을 성공적으로 얻어오면 
                        // LOCAL_LOG_IN mutation에 의해 LocalStorage에 token이 set 된다. 
                        // LocalStorage에 token이 set되는 순간 로그인이 성공된것
                        localLogInMutation({ variables: { token }});
                    } else {
                        throw Error();
                    }
                } catch {
                    throw Error(); 
                }
            }
        }
    }

    return (
        <AuthPresenter 
            action={action} 
            setAction={setAction} 
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            onSubmit={onSubmit}
        />
    )
}
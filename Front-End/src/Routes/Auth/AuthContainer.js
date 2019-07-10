import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, LOCAL_LOG_IN, CREATE_ACCOUNT } from './AuthQueries';
import { toast } from "react-toastify";

export default () => {
    // 회원가입, 로그인 등의 상태를 관리하기 위한 react hook 
    const [action, setAction] = useState("logIn");
    const [open, setOpen] = useState(false);
    // 입력값을 받아오기 위해서 useInput hook을 사용함 
    const name = useInput("");
    const email = useInput("");
    const password = useInput("");
    const confirmPassword = useInput("");
    const zipCode = useInput("");
    const address = useInput("");
    const addressDetail = useInput("");
    const phone1 = useInput("010");
    const phone2 = useInput("");
    const phone3 = useInput("");

    const logInMutation = useMutation(LOG_IN, {
        variables: {
            email: email.value,
            password: password.value
        }
    });

    const localLogInMutation = useMutation(LOCAL_LOG_IN);

    const createAccountMutation = useMutation(CREATE_ACCOUNT, {
        variables: {
            name: name.value,
            email: email.value,
            password: password.value,
            zipCode: zipCode.value,
            address: address.value,
            addressDetail: addressDetail.value,
            phone: phone1.value + "-" + phone2.value + "-" + phone3.value
        }
    })

    // daum pstcode API의 callback 함수 
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
    }

    const loginFunction = async () => {
        if (email !== "" && password !== "") {
            try {
                // logInMutation으로 부터 token 값을 얻어옴 
                const { data: { login: token } } = await logInMutation();
                if (token !== "" && token !== undefined) {
                    // token 값을 성공적으로 얻어오면 
                    // LOCAL_LOG_IN mutation에 의해 LocalStorage에 token이 set 된다. 
                    // LocalStorage에 token이 set되는 순간 로그인이 성공된것
                    localLogInMutation({ variables: { token } });
                    // 새로고침 => 새로고침을 하지 않으면 바로 mutation 값을 읽어올수 없음 
                    window.location ="/";
                } else {
                    throw Error();
                }
            } catch {
                // back-end로 부터의 error를 catch하여 toast로 로그인 실패 메시지를 보여줌 
                toast.error(`로그인에 실패하였습니다😢 email 또는 Password를 확인해 주세요.`);
            }
        }
    }


    const onSubmit = async e => {
        e.preventDefault();

        if (action === "logIn") {
            loginFunction();
        } else if (action === "signUp") {
            // 빈값이 있는지 확인 
            if (
                name.value !== "" &&
                email.value !== "" &&
                password.value !== "" &&
                confirmPassword.value !== "" &&
                zipCode.value !== "" &&
                address.value !== "" &&
                addressDetail.value !== "" &&
                phone1.value !== "" &&
                phone2.value !== "" &&
                phone3.value !== ""
            ) {
                // 비밀번호, 비밀번호확인값 일치 검사 
                if (password.value !== confirmPassword.value) {
                    toast.error("비밀번호가 일치하지 않습니다.");
                    return false;
                }
                try {
                    const { data: { createAccount } } = await createAccountMutation();
                    if (!createAccount) {
                        toast.error("회원가입에 실패하였습니다. 다시시도해 주세요");
                    } else {
                        // 회원가입 성공시 loginFunction을 실행함으로써 
                        // token값을 얻어오고 main화면으로 이동 
                        // setTimeout을 하지 않을 경우 성공적으로 createAccountMutation된 값을 
                        // loginFunction에서 읽지 못하므로 setTimeout으로 약간의 시간을 줌 
                        setTimeout(() => loginFunction(), 1000);
                        
                        // 값 초기화  
                        name.setValue("");
                        email.setValue("");
                        password.setValue("");
                        confirmPassword.setValue("");
                        zipCode.setValue("");
                        address.setValue("");
                        addressDetail.setValue("");
                        phone3.setValue("");
                        phone1.setValue("");
                        phone2.setValue("");

                    }
                } catch (e) {
                    toast.error(e.message);
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
            zipCode={zipCode}
            address={address}
            addressDetail={addressDetail}
            onSubmit={onSubmit}
            open={open}
            setOpen={setOpen}
            handleAddress={handleAddress}
            phone1={phone1.setValue}
            phone2={phone2}
            phone3={phone3}
        />
    )
}
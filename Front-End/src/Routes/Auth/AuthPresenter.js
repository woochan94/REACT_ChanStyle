import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from './../../Components/Button';
import SignUpForm from "../../Components/SignUpForm";

const Wrapper = styled.section`
    min-height: 76vh;
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    @media (max-width: 600px) {
        padding: 0 50px;
        min-height: 73vh;
    }
    @media (max-width: 480px) {
        padding: 0 20px;
        min-height: 60vh;
    }
`;

const Box = styled.article`
    width: 100%; 
    border-radius: 0; 
    max-width: 500px; 
    margin: 0 auto;
`;

export const Form = styled(Box)`
    form {
        width: 100%; 
        display: flex; 
        justify-content: center; 
        align-items: center;
        flex-direction: column;
        border: 0; 
        border-top: ${props=> props.theme.boxBorder}; 
        border-bottom: ${props=> props.theme.boxBorder}; 
        margin-bottom: 30px;
        @media (max-width: 600px) {
            ${props => props.theme.whiteBox};
        }
        input {
            width: 80%;
            margin: 5px 0;
            &:first-child {
                margin-top: 15px;
            }
            @media (max-width: 600px) {
                width: 90%;
            }
        }
        button {
            width: 80%;
            margin: 5px 0;
            &:last-child {
                margin-bottom: 15px;
            }
            @media (max-width: 600px) {
                width: 90%;
            }
        }
        #loginBtn, #createAccountBtn {
            background-color: ${props => props.theme.confirmColor};
            color: white;
            margin-bottom: 30px;
        }
    }
`;

const H3 = styled.h3`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 15px;
`;

export default ({
    action,
    setAction,
    name,
    email,
    password,
    confirmPassword,
    zipCode,
    address,
    addressDetail,
    onSubmit,
    open,
    setOpen,
    handleAddress,
    phone1,
    phone2,
    phone3
}) => {
    return (
        <Wrapper>
            <Form>
                {action === "logIn" ?
                    (
                        <>
                            <H3>Login</H3>
                            <form onSubmit={onSubmit}>
                                <Input placeholder={"Email"} {...email} type={"email"} />
                                <Input placeholder={"Password"} {...password} type={"password"} />
                                <Button text={"Login"} type={"submit"} id={"loginBtn"} />
                                <Button text={"Sign Up"} onClick={() => setAction("signUp")} />
                            </form>
                        </>) :
                    (
                        <>
                            <H3>Sign Up</H3>
                            <SignUpForm
                                onSubmit={onSubmit}
                                name={name}
                                email={email}
                                password={password}
                                confirmPassword={confirmPassword} 
                                zipCode={zipCode} 
                                open={open}
                                setOpen={setOpen} 
                                handleAddress={handleAddress} 
                                address={address}
                                addressDetail={addressDetail}
                                phone1={phone1}
                                phone2={phone2}
                                phone3={phone3}
                                setAction={setAction}
                                ButtonText={"Create Account"}
                            />
                        </>
                    )}
            </Form>
        </Wrapper>
    )
}
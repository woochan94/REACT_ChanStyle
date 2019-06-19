import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from './../../Components/Button';
import DaumAPI from "../../Components/DaumAPI";

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
`;

const Form = styled(Box)`
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

const ZipCodeBox = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin: 5px 0;
    #zipCodeInput, #zipCodeBtn {
        width: 45%;
        margin: 0;
    }
    @media (max-width: 600px) {
        width: 90%;
    }
`;

const Select = styled.select`
    border: 0;
    border: ${props => props.theme.boxBorder}; 
    border-radius: ${props => props.theme.borderRadius}; 
    padding: 10px;
    text-align: center;
    margin: 5px 0;
`;

const PhoneBox = styled.div`
    display: flex; 
    width: 80%; 
    justify-content: space-between;
    #phone1, #phone2, #phone3 {
        width: 30%;
    }
    @media (max-width: 600px) {
        width: 90%;
    }
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
                            <form onSubmit={onSubmit}>
                                <Input placeholder={"Name"} {...name} />
                                <Input placeholder={"Email"} {...email} type={"email"} />
                                <Input placeholder={"Password"} {...password} type={"password"} />
                                <Input placeholder={"Confirm Password"} {...confirmPassword} type={"password"} />
                                <ZipCodeBox>
                                    <Input placeholder={"Zip Code"} {...zipCode} id={"zipCodeInput"}/>
                                    <Button text={"Find"} id={"zipCodeBtn"} onClick={() => open === true ? setOpen(false) : setOpen(true)} />
                                </ZipCodeBox>
                                <DaumAPI isOpen={open} handleAddress={handleAddress}></DaumAPI>
                                <Input placeholder={"Address"} {...address} /> 
                                <Input placeholder={"Address Detail"} {...addressDetail} />
                                <PhoneBox>
                                    <Select id={"phone1"} onChange={(e) => phone1(e.target.value)}>
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="017">017</option>
                                        <option value="019">019</option>
                                    </Select>
                                    <Input {...phone2} id={"phone2"} />
                                    <Input {...phone3} id={"phone3"} />
                                </PhoneBox>
                                <Button text={"Create Account"} type={"submit"} id={"createAccountBtn"}/>
                                <Button text={"Back to Login"} onClick={() => setAction("logIn")} />
                            </form>
                        </>
                    )}
            </Form>
        </Wrapper>
    )
}
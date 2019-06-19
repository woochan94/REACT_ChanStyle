import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from './../../Components/Button';
import DaumAPI from "../../Components/DaumAPI";

const Wrapper = styled.div`
    min-height: 76vh;
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
`;

const Box = styled.div`
    width: 100%; 
    border-radius: 0; 
    max-width: 500px; 
`;

const Form = styled(Box)`
    form {
        width: 100%; 
        input {
            width: 100%;
        }
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
                    (<form onSubmit={onSubmit}>
                        <Input placeholder={"Email"} {...email} type={"email"} />
                        <Input placeholder={"Password"} {...password} type={"password"} />
                        <Button text={"Login"} />
                        <Button text={"Sign Up"} onClick={() => setAction("signUp")} />
                    </form>) :
                    (
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"Name"} {...name} />
                            <Input placeholder={"Email"} {...email} type={"email"} />
                            <Input placeholder={"Password"} {...password} type={"password"} />
                            <Input placeholder={"Confirm Password"} {...confirmPassword} type={"password"} />
                            <Input placeholder={"Zip Code"} {...zipCode} />
                            <Button text={"Find Zip Code"} onClick={() => open === true ? setOpen(false) : setOpen(true)} />
                            <DaumAPI isOpen={open} handleAddress={handleAddress}></DaumAPI>
                            <Input placeholder={"Address"} {...address} /> 
                            <Input placeholder={"Address Detail"} {...addressDetail} />
                            <select onChange={(e) => phone1(e.target.value)}>
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="017">017</option>
                                <option value="019">019</option>
                            </select>
                            <Input {...phone2} />
                            <Input {...phone3} />
                            <Button text={"Create Account"} type={"submit"}/>
                            <Button text={"Back to Login"} onClick={() => setAction("logIn")} />
                        </form>
                    )}
            </Form>
        </Wrapper>
    )
}
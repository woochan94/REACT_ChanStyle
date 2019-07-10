import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Button from './Button';
import DaumAPI from "./DaumAPI";
import PropTypes from "prop-types";

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

export const Select = styled.select`
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

const SignUpForm = ({
    onSubmit,
    name,
    email,
    password,
    confirmPassword,
    zipCode,
    open,
    setOpen,
    handleAddress,
    address,
    addressDetail,
    phone1,
    phone2,
    phone3,
    setAction,
    ButtonText
}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input placeholder={"Name"} {...name} />
            <Input placeholder={"Email"} {...email} type={"email"} />
            {ButtonText === "Create Account" ? (
                <>
                    <Input placeholder={"Password"} {...password} type={"password"} />
                    <Input placeholder={"Confirm Password"} {...confirmPassword} type={"password"} />
                </>
            ) : (
                <>
                    <Input placeholder={"Password"} {...password} type={"password"} required={false}/>
                    <Input placeholder={"Confirm Password"} {...confirmPassword} type={"password"} required={false}/>
                </>
            )}
            
            <ZipCodeBox>
                <Input placeholder={"Zip Code"} {...zipCode} id={"zipCodeInput"} />
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
            <Button text={ButtonText} type={"submit"} id={"createAccountBtn"} />
            {ButtonText === "Create Account" && (
                <Button text={"Back to Login"} onClick={() => setAction("logIn")} />
            )}
        </form>
    )
}

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, 
    name: PropTypes.object.isRequired, 
    email: PropTypes.object.isRequired, 
    password: PropTypes.object,
    confirmPassword: PropTypes.object, 
    zipCode: PropTypes.object.isRequired, 
    open: PropTypes.bool.isRequired, 
    setOpen: PropTypes.func.isRequired, 
    handleAddress: PropTypes.func.isRequired, 
    address: PropTypes.object.isRequired, 
    addressDetail: PropTypes.object.isRequired,
    phone1: PropTypes.func, 
    phone2: PropTypes.object,
    phone3: PropTypes.object, 
    setAction: PropTypes.func,
    ButtonText: PropTypes.string.isRequired
}

export default SignUpForm;
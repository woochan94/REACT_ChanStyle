import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from './../../Components/Button';

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

export default ({ action, setAction }) => {
    return (
        <Wrapper>
            <Form>
                {action === "logIn" ?
                    (<form>
                        <Input placeholder={"Email"} />
                        <Input placeholder={"Password"} />
                        <Button text={"Login"} />
                        <Button text={"Sign Up"} onClick={() => setAction("signUp")}/> 
                    </form>) :
                    (<form>
                        <Input placeholder={"Name"} />
                        <Input placeholder={"Email"} />
                        <Input placeholder={"Password"} />
                        <Input placeholder={"Confirm Password"} />
                        <Button text={"Create Account"} />
                        <Button text={"Back to Login"} onClick={() => setAction("logIn")} />
                    </form>)}
            </Form>
        </Wrapper>
    )
}
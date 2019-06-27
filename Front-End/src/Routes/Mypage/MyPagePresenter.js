import React from "react"; 
import styled from "styled-components"; 
import { TitleDiv, H2 } from "../Product/ProductPresenter";
import Button from "../../Components/Button";
import { Form } from "../Auth/AuthPresenter";
import SignUpForm from "../../Components/SignUpForm";

const MyPage = styled.section`
    min-height: 79vh;
`;

const MyPageWrapper = styled.div`
    @media (max-width: 1024px) {
        padding: 0 50px;
    }
    @media (max-width: 600px) {
        padding: 0 20px;
    }
`; 

const MyPageHeader = styled.header``;

const MyTitleDiv = styled(TitleDiv)`
    display: flex; 
    justify-content: space-between;
    button {
        width: auto;
    }
`;

const MyNavDiv = styled.div`
    display: grid; 
    grid-template-columns: repeat(3, 1fr);
    padding: 30px 0 0; 
    border-bottom: 1px solid #ccc;
    button {
        border: 1px solid transparent; 
        border-bottom: 0; 
        cursor: pointer; 
        font-weight: 600;
        background-color: transparent;
        font-size: 18px;
        outline: none;
        padding: 15px;
        @media (max-width: 480px) {
            padding: 10px;
        }
        :hover {
            color: ${props => props.theme.confirmColor};
        }
    }
`;

const Article = styled.article`
    display: flex; 
    justify-content: center;
    margin-top: 60px;
`;

export default ({
    tab,
    clickTab,
    onSubmit,
    name,
    email,
    password, 
    confirmPassword,
    zipCode,
    address,
    addressDetail,
    phone1,
    phone2,
    phone3,
    open,
    setOpen,
    handleAddress
}) => {
    return (
        <MyPage>
            <MyPageWrapper>
                <MyPageHeader>
                    <MyTitleDiv>
                        <H2>My Page</H2>
                        <Button text={"LogOut"} onClick={() => console.log("logout")}/>
                    </MyTitleDiv>
                    <MyNavDiv>
                        <button onClick={() => clickTab("cart")} 
                            style={ tab === "cart" ? 
                                    {borderColor:"#ccc", borderBottom:"1px solid #fff", marginBottom: "-1px"} : 
                                    {borderColor: "transparent"} } > 
                            Cart 
                        </button>
                        <button onClick={() => clickTab("buyList")} 
                            style={ tab === "buyList" ? 
                                    {borderColor:"#ccc", borderBottom:"1px solid #fff", marginBottom: "-1px"} : 
                                    {borderColor: "transparent"} } > 
                            buyList 
                        </button>
                        <button onClick={() => clickTab("editProfile")} 
                            style={ tab === "editProfile" ? 
                                    {borderColor:"#ccc", borderBottom:"1px solid #fff", marginBottom: "-1px"} : 
                                    {borderColor: "transparent"} } > 
                            editProfile 
                        </button>
                    </MyNavDiv>
                </MyPageHeader>
                <Article>
                    {tab === "cart" ? 
                        <div>
                            cart
                        </div>: 
                    tab === "buyList" ? 
                        <div>
                            buyList
                        </div>:
                        <Form>
                            <SignUpForm 
                                onSubmit={onSubmit}
                                name={name}
                                email={email}
                                ButtonText={"Edit Profile"}
                                password={password}
                                confirmPassword={confirmPassword}
                                zipCode={zipCode}
                                address={address}
                                addressDetail={addressDetail}
                                phone1={phone1}
                                phone2={phone2}
                                phone3={phone3}
                                open={open}
                                setOpen={setOpen}
                                handleAddress={handleAddress}
                            />
                        </Form>
                    }
                </Article>
            </MyPageWrapper>
        </MyPage>
    )
}
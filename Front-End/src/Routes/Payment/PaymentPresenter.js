import React from "react";
import styled from "styled-components";
import { H2, TitleDiv } from "../Product/ProductPresenter";
import ProductTable from "../../Components/ProductTable";
import { Article } from "../Mypage/MyPagePresenter";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";

const Payment = styled.section`
    min-height: 79vh; 
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    width: 100%; 
`;

const PaymentWrapper = styled.div`
    #responsiveTotalDiv {
        @media (min-width: 600px) {
            display: none;
        }
    }
    @media (max-width: 1024px) {
        padding: 0 50px;
    }
    @media (max-width: 600px) {
        padding: 0 20px;
    }
    @media (max-width: 350px) {
        padding: 0 10px;
    }
`;

const H3 = styled.h3`
    font-size: 24px; 
    font-weight: 600;
`;

const Form = styled.form`
    margin-top: 15px !important;
    border-top: 1px solid #ccc; 
    width: 100%;
`;

const FormDiv = styled.div`
    padding: 15px 10px;
    border-bottom: 1px solid #ccc;
`;

const InputTitleDiv = styled.div`
    width: 30%;
    text-align: center;
    font-size: 18px;
    display: inline-block;
`;

const InputDiv = styled.div`
    width: 70%; 
    display: inline-block;
`;

const InputDiv2 = styled(InputDiv)`
    margin-left: 30%;
`;

const ButtonDiv = styled.div`
    display: flex;
    margin: 30px 0;
    justify-content: center;
`;

const PayBtn = styled.button`
    padding: 10px 0; 
    border: none; 
    border-radius: 5px; 
    width: 100%; 
    background-color: ${props => props.theme.confirmColor}; 
    cursor: pointer;
    color: #fff;
`;

const CompleteArticle = styled.article`
    padding-top: 200px;
`;

const CompleteDiv = styled.div`
    width: 100%; 
    height: 100%; 
    ${props => props.theme.whiteBox};
    box-shadow: 0px 0px 0px rgba(0,0,0,0), 0px 0px 10px rgba(0,0,0,0.1);
    padding: 100px 0 50px 0;
`;

const CompleteTextDiv = styled.div`
    display: flex; 
    justify-content: center;
    h2 {
        font-size: 45px; 
        font-weight: 600;
        @media (max-width: 600px) {
            font-size: 32px; 
        }
        @media (max-width: 400px) {
            font-size: 27px;
        }
    }
    span {
        color: firebrick;
    }
`; 

const CompleteButtonDiv = styled.div`
    display: flex; 
    justify-content: center;
    padding-top: 50px;
    button {
        width: auto !important;
        background-color: ${props => props.theme.confirmColor} !important; 
        color: #fff !important;
    }
`;

export default ({
    paymentData,
    paymentLoading,
    total,
    name,
    zipCode,
    address,
    addressDetail,
    email,
    phone,
    openPay,
    complete,
    goHome
}) => {
    return (
        <Payment>
            <PaymentWrapper>
                {paymentLoading === true && <Loader />}
                {paymentLoading === false && !complete && setTimeout(() => <Loader />, 2000) &&(
                    <>
                        <Article>
                            <TitleDiv>
                                <H2>Order</H2>
                            </TitleDiv>
                            <ProductTable
                                paymentData={paymentData}
                                total={total}
                            />
                        </Article>
                        <Article>
                            <H3>Order Information</H3>
                            <Form>
                                <FormDiv>
                                    <InputTitleDiv>name</InputTitleDiv>
                                    <InputDiv>{name}</InputDiv>
                                </FormDiv>
                                <FormDiv>
                                    <InputTitleDiv>address</InputTitleDiv>
                                    <InputDiv>
                                        {zipCode}
                                    </InputDiv>
                                    <InputDiv2>
                                        {address}
                                    </InputDiv2>
                                    <InputDiv2>
                                        {addressDetail}
                                    </InputDiv2>
                                </FormDiv>
                                <FormDiv>
                                    <InputTitleDiv>email</InputTitleDiv>
                                    <InputDiv>
                                        {email}
                                    </InputDiv>
                                </FormDiv>
                                <FormDiv>
                                    <InputTitleDiv>phone</InputTitleDiv>
                                    <InputDiv>
                                        {phone}
                                    </InputDiv>
                                </FormDiv>
                            </Form>
                        </Article>
                        <ButtonDiv>
                            <PayBtn onClick={() => openPay()}>결제하기</PayBtn>
                        </ButtonDiv>
                    </>
                )}
                {complete && (
                    <CompleteArticle>
                        <CompleteDiv>
                            <CompleteTextDiv>
                                <h2>주문이 <span>완료</span>되었습니다.</h2>
                            </CompleteTextDiv>
                            <CompleteButtonDiv>
                                <Button text={"홈으로 가기"} onClick={() => goHome()}/>
                            </CompleteButtonDiv>
                        </CompleteDiv> 
                    </CompleteArticle>
                )}

            </PaymentWrapper>
        </Payment>
    )
}
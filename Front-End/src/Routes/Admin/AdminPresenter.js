import React from "react"; 
import styled from "styled-components"; 
import { MyPage, MyTitleDiv } from "../Mypage/MyPagePresenter";
import { H2 } from "../Product/ProductPresenter";
import Button from './../../Components/Button';

const Admin = styled(MyPage)``;

const AdminWrapper = styled.div``;

export default ({
    logOut
}) => {
    return (
        <Admin>
            <AdminWrapper>
                <MyTitleDiv>
                    <H2>Admin Page</H2>
                    <Button text={"LogOut"} onClick={() => logOut()} />
                </MyTitleDiv>
            </AdminWrapper>
        </Admin>
    )
}
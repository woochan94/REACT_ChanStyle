import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
    width: 100%; 
    position: fixed; 
    top: 0;
    left: 0;
    border-bottom: ${props => props.theme.boxBorder};
    background-color: black;
    z-index: 9999;
`;

const HeaderWrapper = styled.div`
    width: 100%; 
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    @media (max-width: 600px) {
        height:120px;
    }
`;

const Logo = styled.h1`
    padding: 25px 0;
    font-size: 32px;
    font-weight: 600;
    a {
        color: white;
    }
`;

export default () => {
    return (
        <Header>
            <HeaderWrapper>
                <Logo>
                    <Link to="/">CHANSTYLE</Link>
                </Logo>
            </HeaderWrapper>
        </Header>
    )
}
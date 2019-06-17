import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
    width: 100%; 
    position: fixed; 
    top: 0;
    left: 0;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    border-bottom: ${props => props.theme.boxBorder};
    background-color: black;
`;

const Logo = styled.div`
    padding: 20px 0;
    font-size: 32px;
    font-weight: 600;
    a {
        color: white;
    }
`;

const Navigator = styled.nav`
    width: 100%;
    border-top: ${props => props.theme.boxBorder};
    background-color: #fff;
`;

const UL = styled.ul` 
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    font-size: 20px;
    font-weight: 500;
`;

const LI = styled.li`
    padding:10px 0;
    &:nth-child(3) {
        a {
            color: red;
        }
    }
`; 


export default () => {
    return (
        <Header>
            <Logo>
                <Link to="/">
                    CHANSTYLE
                </Link>
            </Logo>
            <Navigator>
                <UL>
                    <LI><Link to="/">HOME</Link></LI>
                    <LI><Link to="/store">STORE</Link></LI>
                    <LI><Link to="/sale">SALE</Link></LI>
                    <LI><Link to="/aaa">LOGIN</Link></LI>              
                </UL>
            </Navigator>
        </Header>
    )
}
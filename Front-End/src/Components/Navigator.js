import React from "react"; 
import styled from "styled-components"; 
import { Link } from "react-router-dom"; 

const Navigator = styled.nav`
    width: 100%; 
    position: fixed;
    top: 82px;
    left: 0;
    border-bottom: ${props => props.theme.boxBorder};
    @media (max-width: 600px) {
        top: 120px;
    }
`;

const NavigatorWrapper = styled.div`
    width: 100%; 
    max-width: ${props => props.theme.maxWidth}; 
    margin: 0 auto;
    background-color: white;
`; 

const UL = styled.ul`
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    text-align: center; 
    font-size: 20px; 
    font-weight: 500;
`; 

const LI = styled.li`
    padding: 10px 0; 
    &:nth-child(3) {
        a {
            color: red;
        }
    }
`; 

export default () => {
    return (
        <Navigator>
            <NavigatorWrapper>
                <UL>
                    <LI><Link to="/">HOME</Link></LI>
                    <LI><Link to="/store">STORE</Link></LI>
                    <LI><Link to="/sale">SALE</Link></LI>
                    <LI><Link to="/auth">LOGIN</Link></LI>
                </UL>
            </NavigatorWrapper>
        </Navigator>
    )
}
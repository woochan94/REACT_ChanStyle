import React from "react"; 
import styled from "styled-components"; 
import { Link } from "react-router-dom"; 
import { useQuery } from "react-apollo-hooks";
import { ME } from "./SharedQueries";

const Navigator = styled.nav`
    width: 100%; 
    position: fixed;
    top: 82px;
    left: 0;
    border-bottom: ${props => props.theme.boxBorder};
    @media (max-width: 600px) {
        top: 120px;
    }
    background-color: ${props => props.theme.whiteColor};
    z-index: 9999;
`;

const NavigatorWrapper = styled.div`
    width: 100%; 
    max-width: ${props => props.theme.maxWidth}; 
    margin: 0 auto;
    background-color: ${props => props.theme.whiteColor};
`; 

const UL = styled.ul`
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    text-align: center; 
    font-size: 20px; 
    font-weight: 500;
`; 

const LI = styled.li`
    padding: 10px 0; 
`; 

export default ({ isLoggedIn, isAdmin }) => {

    let Data = [];
    if( isLoggedIn){
        const { data } = useQuery(ME); 
        Data = data;
    }

    return (
        <Navigator>
            <NavigatorWrapper>
                {isLoggedIn && Data.me &&(
                    <UL>
                        <LI><Link to="/">HOME</Link></LI>
                        <LI><Link to="/store">STORE</Link></LI>
                        {isAdmin && <LI><Link id={"myPage"} to={`/${Data.me.id}`}>Admin</Link></LI>}
                        {!isAdmin && <LI><Link id={"myPage"} to={`/${Data.me.id}`}>MyPage</Link></LI>}
                    </UL>
                )}
                {isLoggedIn && !Data.me &&(
                    <UL>
                        <LI><Link to="/">HOME</Link></LI>
                        <LI><Link to="/store">STORE</Link></LI>
                        <LI><Link to="/auth">MyPage</Link></LI>
                    </UL>
                )}
                {!isLoggedIn && (
                    <UL>
                        <LI><Link to="/">HOME</Link></LI>
                        <LI><Link to="/store">STORE</Link></LI>
                        <LI><Link to="/auth">LOGIN</Link></LI>
                    </UL>   
                )}
            </NavigatorWrapper>
        </Navigator>
    )
}
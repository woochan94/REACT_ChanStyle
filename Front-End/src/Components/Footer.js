import React from "react"; 
import styled from "styled-components"; 

const Footer = styled.footer`
    display: flex; 
    background-color: black;
    padding: 30px 0 10px;
    @media (max-width: 480px) {
        height: 23vh;
    }
`; 

const FooterWrapper = styled.div`
    width: 100%; 
    max-width: ${props => props.theme.maxWidth}; 
    margin: 0 auto;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    @media (max-width: 480px) {
        padding-bottom: 50px;
    }
`;

const GIT = styled.div`
    margin-bottom: 15px;
    a{
        color: white;
    }
    svg {
        color: white;
    }
`;



const Copyright = styled.div`
    color: white;
`;

export default () => (
    <Footer>
        <FooterWrapper>
            <GIT>
                <a href="https://github.com/JeongWooChan/REACT_ChanStyle">GitHub 바로가기 </a>
            </GIT>
            <Copyright>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.</Copyright>
        </FooterWrapper>
    </Footer>
)
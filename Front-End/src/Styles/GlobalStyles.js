import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; 

export default createGlobalStyle`
    ${reset}; 
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    * {
        box-sizing: border-box;
    }
    body {
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-top: 123px;
        background-color: ${props => props.theme.bgColor};
        @media (max-width: 600px) {
            padding-top: 160px;
        }
    }
    a {
        text-decoration: none;
        color: black;
    }
`;
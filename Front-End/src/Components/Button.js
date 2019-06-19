import React from "react"; 
import styled from "styled-components"; 
import PropTypes from "prop-types"; 

const Container = styled.button`
    width: 100%; 
    border: 0; 
    border-radius: ${props => props.theme.borderRadius}; 
    text-align: center; 
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
`;

const Button = ({ text, onClick, type = "button", id }) => <Container onClick={onClick} type={type} id={id}>{text}</Container>

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string, 
    id: PropTypes.string
};

export default Button;
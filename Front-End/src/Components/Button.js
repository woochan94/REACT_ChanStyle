import React from "react"; 
import styled from "styled-components"; 
import PropTypes from "prop-types"; 

const Container = styled.button`
    width: 100%; 
    border: 0; 
    border-radius: ${props => props.theme.borderRadius}; 
    text-align: center; 
    cursor: pointer;
`;

const Button = ({ text, onClick, type = "button" }) => <Container onClick={onClick} type={type}>{text}</Container>

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string
};

export default Button;
import React from "react"; 
import PropTypes from "prop-types"; 
import styled from "styled-components"; 

const Container = styled.input`
    border: 0; 
    border: ${props => props.theme.boxBorder}; 
    border-radius: ${props => props.theme.borderRadius}; 
`;

const Input = ({ placeholder }) => <Container placeholder={placeholder} />

Input.propTypes = {
    placeholder: PropTypes.string.isRequired
}

export default Input; 
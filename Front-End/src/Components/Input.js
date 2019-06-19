import React from "react"; 
import PropTypes from "prop-types"; 
import styled from "styled-components"; 

const Container = styled.input`
    border: 0; 
    border: ${props => props.theme.boxBorder}; 
    border-radius: ${props => props.theme.borderRadius}; 
`;

const Input = ({ 
    placeholder, 
    required = true, 
    value, 
    onChange, 
    type = "text"
}) => (<Container 
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
/>)

Input.propTypes = {
    placeholder: PropTypes.string,
    require: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string
}

export default Input; 
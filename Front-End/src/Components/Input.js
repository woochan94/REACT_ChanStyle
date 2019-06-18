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
    require = true, 
    value, 
    onChange, 
    type = "text"
}) => (<Container 
    placeholder={placeholder}
    require={require}
    value={value}
    onChange={onChange}
    type={type}
/>)

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string
}

export default Input; 
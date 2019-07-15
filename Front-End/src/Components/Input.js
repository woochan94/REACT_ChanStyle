import React from "react"; 
import PropTypes from "prop-types"; 
import styled from "styled-components"; 

const Container = styled.input`
    border: 0; 
    border: ${props => props.theme.boxBorder}; 
    border-radius: ${props => props.theme.borderRadius}; 
    padding: 10px;
`;

const Input = ({ 
    placeholder, 
    required = true, 
    value, 
    onChange, 
    type = "text",
    id,
    defaultValue
}) => (<Container 
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    id={id}
    defaultValue={defaultValue}
/>)

Input.propTypes = {
    placeholder: PropTypes.string,
    require: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    id: PropTypes.string
}

export default Input; 
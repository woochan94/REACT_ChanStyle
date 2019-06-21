import React from "react"; 
import styled from "styled-components"; 

export default ({ imgSrc, title, price }) => {
    const ItemDiv = styled.div`
        display: flex; 
        flex-direction: column;
    `;

    const Img = styled.img`
        ${props => props.theme.whiteBox};
        width: 100%;
        height: 30vh;
    `;

    const TextDiv = styled.div`
        text-align: center;
    `;

    return (
        <ItemDiv>
            <Img src={imgSrc} />
            <TextDiv>
                <h3>{title}</h3>
                <h3>{price}</h3>
            </TextDiv>
        </ItemDiv>
    )
}
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default ({ imgSrc, title, price, id }) => {
    const ItemDiv = styled.article`
        display: flex; 
        flex-direction: column;
        margin: 0 10px;
        justify-content: space-between;
    `;

    const Img = styled.img`
        ${props => props.theme.whiteBox};
        width: 100%;
        height: 30vh;
    `;

    const TextDiv = styled.div`
        display: flex;
        flex-direction: column;
        margin-top: 10px; 
    `;

    const P = styled.p`
        padding-bottom: 5px;
        color: #555555;
        font-size: 14px;
    `;

    return (
        <Link to={`/product/${id}`}>
            <ItemDiv>
                <Img src={imgSrc} />
                <TextDiv>
                    <P>{title}</P>
                    <P>{price}</P>
                </TextDiv>
            </ItemDiv>
        </Link>
    )
}
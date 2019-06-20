import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const Main = styled.section`
    max-height: 35vh;
    ${props => props.theme.whiteBox};
    margin-bottom: 30px;
`;

const DIV = styled.div`
    display: flex;
    position: relative;
    height: 35vh;
    img {
        position: absolute;
        top: 0;
        left: 0; 
        width: 100%;
        height: 100%;
    }
`;


export default () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };
    return (
        <Main>
            <Slider {...settings}>
                <DIV>
                    <img src="https://cdn.pixabay.com/photo/2015/07/27/19/47/turtle-863336__340.jpg" alt="aaa" />
                </DIV>
                <DIV>
                    <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F24283C3858F778CA2E" alt="bb" />
                </DIV>        
            </Slider>
        </Main>
    );
}
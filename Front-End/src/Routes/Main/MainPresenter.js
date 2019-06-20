import React from "react"; 
import Slider from "react-slick";
import styled from "styled-components";

const Main = styled.section`
    max-height: 50vh;
    margin-bottom: 30px;
`;

const MainWrapper = styled.article`
    padding: 0 50px;
    @media (max-width: 600px) {
        padding: 0;
    }
`;

const DIV = styled.div`
    height: 50vh;
    img {
        width: 100%;
        height: 100%;
    }
    @media (max-width: 600px) {
        height: 30vh;
    }
`;

export default ({settings}) => {
    return (
        <Main>
            <MainWrapper>
                <Slider {...settings}>
                    <DIV>
                        <img src="https://cdn.pixabay.com/photo/2015/07/27/19/47/turtle-863336__340.jpg" alt="aaa" />
                    </DIV>
                    <DIV>
                        <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F24283C3858F778CA2E" alt="bb" />
                    </DIV>        
                </Slider>
            </MainWrapper>
        </Main>
    )
}



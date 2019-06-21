import React from "react"; 
import Slider from "react-slick";
import styled from "styled-components";
import ItemBox from "../../Components/ItemBox";

const Main = styled.div`
    margin-bottom: 30px;
`;

const MainWrapper = styled.div`
    padding: 0 50px;
    @media (max-width: 600px) {
        padding: 0;
    }
`;

const SliderDiv = styled.div`
    height: 50vh;
    img {
        width: 100%;
        height: 100%;
    }
    @media (max-width: 600px) {
        height: 30vh;
    }
`;

const MainTitle = styled.div`
    margin-top: 70px;
    border-bottom: 1px solid #a9a9a9;
    padding: 20px;
    margin-bottom: 40px;
`;

const H4 = styled.h4`
    font-size: 32px;
    font-weight: 600;
    text-align: center;
`;

const CustomSlider = styled(Slider)`
    @media (min-width: 601px) {
        .slick-slide {
        display: grid; 
        grid-template-columns: repeat(4, 1fr);
        margin-bottom: 30px;
        } 
        .slick-track {
            width: 0 !important;
        } 
    }
    .slick-dots {
        position: relative; 
        margin-top: 20px;
    }
    .slick-dots>li>button:before {
        color: black;
    }
`;

export default ({
    settings,
    itemSettings,
    testData,
    bestData,
    newData,
    bestLoading,
    newLoading
}) => {
    return (
        <Main>
            <MainWrapper>
                <Slider {...settings}>
                    {testData.map((data, index) => (
                        <SliderDiv key={data.id}>
                            <img src={data.url} alt={index}/>
                        </SliderDiv>
                    ))}    
                </Slider>
                <MainTitle>
                    <H4><span role="img" aria-label="">🔥 BEST ITEM 🔥</span></H4>
                </MainTitle>    
                <CustomSlider {...itemSettings}>
                    {!bestLoading && bestData.seeproduct.map(item => (
                        <ItemBox
                            key={item.id} 
                            imgSrc={item.files[0].url}
                            title={item.name}
                            price={item.price}
                        />
                    ))} 
                </CustomSlider>
                <MainTitle>
                    <H4><span role="img" aria-label="">⭐ NEW ITEM ⭐</span></H4>
                </MainTitle>
                <CustomSlider {...itemSettings}>
                    {!newLoading && newData.seeproduct.map(item => (
                        <ItemBox
                            key={item.id} 
                            imgSrc={item.files[0].url}
                            title={item.name}
                            price={item.price}
                        />
                    ))} 
                </CustomSlider>
            </MainWrapper>
        </Main>
    )
}



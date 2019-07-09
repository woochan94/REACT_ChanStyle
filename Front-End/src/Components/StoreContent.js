import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ItemBox from "./ItemBox";

const ContentTitleDiv = styled.div`
    border-bottom: ${props => props.theme.borderBottom};
    padding: 20px 0 10px;
`;

const H2 = styled.h2`
    font-size: ${props => props.theme.titleFontSize};
    font-weight: 600;
`;

const H3 = styled.h3`
    font-size: 24px; 
    font-weight: 600;
    margin-bottom: 30px;
`;

const Best = styled.article`
    padding: 15px 0 30px;
`;

const CustomSlider = styled(Slider)`
    .slick-slide {
        display: grid; 
        grid-template-columns: repeat(4, 1fr);
    }
    @media(max-width: 1024px) {
        .slick-slide {
            grid-template-columns: 1fr;
            margin-bottom: 30px;
        }
        .slick-dots>li>button:before {
            color: black;
        }
    }
`;

const AllItem = styled.article`
    border-top: ${props => props.theme.borderBottom};
`;

const AllItemGrid = styled.div`
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    padding: 50px 0; 
    grid-row-gap: 50px;
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const StoreContent = ({
    title,
    all,
    best,
    settings
}) => {
    return (
        <>
            <ContentTitleDiv>
                <H2>{title}</H2>
            </ContentTitleDiv>
            <Best>
                <H3><span role="img" aria-label="">🔥Best Item🔥</span></H3>
                <CustomSlider {...settings}>
                    {best.length !== 0 && best.seeProductBest.map(item => (
                        <ItemBox
                            key={item.id}
                            imgSrc={item.files[0].url}
                            title={item.name}
                            price={item.price}
                            id={item.id}
                        />
                    ))}
                </CustomSlider>
            </Best>
            <AllItem>
                <AllItemGrid>
                    {all.length !== 0 && all.map(item => (
                        <ItemBox
                            key={item.id}
                            imgSrc={item.files[0].url}
                            title={item.name}
                            price={item.price}
                            id={item.id}
                        />
                    ))}
                </AllItemGrid>
            </AllItem>
        </>
    )
}

StoreContent.propTypes = {
    title: PropTypes.string.isRequired,
    settings: PropTypes.object
}

export default StoreContent; 
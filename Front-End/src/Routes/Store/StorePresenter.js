import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ItemBox from "../../Components/ItemBox";
import Loader from "../../Components/Loader";

const Store = styled.div`
    min-height: 79vh;
    position: relative;
`;

const Menubar = styled.aside`
    position: absolute;
    width: 250px;
    height: 100%;
    background-color:#2e353d;
    @media (max-width: 768px) {
        width: 200px;
    }
    @media (max-width: 600px) {
        width: 100%; 
        position: relative;
    }
`;

const CategoryTitle = styled.div`
    font-size: 22px; 
    font-weight: 600; 
    text-align: center; 
    line-height: 50px; 
    color: white;
    background-color: #23282e;
`;

const MenuList = styled.div`
    @media (max-width: 600px) {
        display: none;
    }
`;

const MenuUl = styled.ul`
    text-align: center;
    color: white;
`;

const MenuLi = styled.li`
    padding: 15px;
    cursor: pointer;
    &:hover {
        background-color: #4f5b69;
        transition: all 1s ease;
    }
`;

const DropUl = styled.ul`
    display: none;
    
`;

const DropLi = styled.li`
    background-color: #181c20;
    padding: 10px 0;
    border-bottom: 1px solid #23282e;
    cursor: pointer;
    &:hover {
        background-color: #020203;
    }
`;

const ContentSection = styled.section`
    margin-left: 250px;
    @media (max-width: 768px) {
        margin-left: 200px;
    }
    @media (max-width: 600px) {
        margin-left: 0;
    }
`;

const ContentWrapper = styled.div`
    margin: 0 50px;
    @media (max-width: 480px) {
        margin: 0 20px;
    }
`;

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
    grid-template-rows: repeat(2,1fr);
    padding: 50px 0; 
    grid-row-gap: 50px;
`;

export default ({
    topToggle,
    bottomToggle,
    menuListToggle,
    title,
    menuClick,
    best,
    all,
    settings
}) => {
    return (
        <Store>
            <Menubar>
                <CategoryTitle onClick={() => menuListToggle()}> Category </CategoryTitle>
                <MenuList id={"menuList"}>
                    <MenuUl>
                        <MenuLi onClick={() => menuClick("ALL")}>ALL</MenuLi>
                        <MenuLi onClick={() => topToggle()}>Top</MenuLi>
                        <DropUl id={"top"}>
                            <DropLi onClick={() => menuClick("Top ALL")}>All</DropLi>
                            <DropLi onClick={() => menuClick("T-Shirt")}>T-Shirt</DropLi>
                            <DropLi onClick={() => menuClick("Shirt")}>Shirt</DropLi>
                        </DropUl>
                        <MenuLi onClick={() => bottomToggle()}>Bottom</MenuLi>
                        <DropUl id={"bottom"}>
                            <DropLi onClick={() => menuClick("BOTTOM ALL")}>All</DropLi>
                            <DropLi onClick={() => menuClick("Jean")}>Jean</DropLi>
                            <DropLi onClick={() => menuClick("Slacks")}>Slacks</DropLi>
                        </DropUl>
                    </MenuUl>
                </MenuList>
            </Menubar>
            <ContentSection>
                <ContentWrapper>
                    {title === "ALL" && all.length === 0 && <Loader />}
                    {title === "ALL" && best.length !== 0 && all.length !== 0 && (
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
                                    {all.length !== 0 && all.seeProductAll.map(item => (
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
                    )}
                </ContentWrapper>
            </ContentSection>
        </Store>
    )
}
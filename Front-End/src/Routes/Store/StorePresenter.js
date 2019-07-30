import React from "react";
import styled from "styled-components";
import StoreContent from './../../Components/StoreContent';
import Loader from "../../Components/Loader";
import { DownIcon } from "../../Components/Icons";

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
    @media (max-width: 700px) {
        width: 100%; 
        position: relative;
    }
`;

const CategoryTitle = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 22px; 
    font-weight: 600; 
    text-align: center; 
    line-height: 50px; 
    color: white;
    background-color: #23282e;
    div {
        height: 38px;
        @media (min-width: 600px) {
            display:none;
        }
    }
    @media (max-width: 700px) {
        cursor: pointer;
    }
`;

const MenuList = styled.div`
    @media (max-width: 700px) {
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
    max-width: 1300px; 
    margin: 0 auto;
    margin-left:250px;
    @media (max-width: 768px) {
        margin-left: 200px;
    }
    @media (max-width: 700px) {
        margin-left: 0;
    }
`;

const ContentWrapper = styled.div`
    margin: 0 50px;
    @media (max-width: 480px) {
        margin: 0 20px;
    }
`;

const MoreDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 100px;
    div {
        min-height: 0 !important;
    }
`;

const MoreBtn = styled.button`
    border: none; 
    font-size: 18px;
    padding: 10px 15px;
    border-radius: 30px; 
    background-color: ${props => props.theme.confirmColor}; 
    color: #fff; 
    cursor: pointer;
    outline-style: none;
`;


export default ({
    topToggle,
    bottomToggle,
    menuListToggle,
    title,
    menuClick,
    best,
    all,
    settings,
    clickMore,
    pLoading,
    dataTemp
}) => {
    return (
        <Store>
            <Menubar>
                <CategoryTitle onClick={() => menuListToggle()}>
                    <span>Category</span> <div><DownIcon/></div>
                </CategoryTitle>
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
                    {all.length === 0 && <Loader />}
                    {best.length !== 0 && all.length !== 0 && (
                        <StoreContent
                            title={title}
                            all={all}
                            best={best}
                            settings={settings}
                        />
                    )}
                </ContentWrapper>
                {pLoading && (
                    <MoreDiv>
                        <Loader />
                    </MoreDiv>
                )}
                {all.length >= 4 && best.length !== 0 && all.length !== 0 && !pLoading && dataTemp.seeProductAll.length !== 0 && (
                    <MoreDiv>
                        <MoreBtn onClick={() => clickMore()}>더 보기</MoreBtn> 
                    </MoreDiv>
                )}
            </ContentSection>
        </Store>
    )
}
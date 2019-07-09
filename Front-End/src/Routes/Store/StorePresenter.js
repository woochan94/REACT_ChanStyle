import React from "react";
import styled from "styled-components";
import StoreContent from './../../Components/StoreContent';
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

export default ({
    topToggle,
    bottomToggle,
    menuListToggle,
    title,
    menuClick,
    best,
    all,
    settings,
    clickMore
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
                <button onClick={() => clickMore()}>더보기</button>
            </ContentSection>
        </Store>
    )
}
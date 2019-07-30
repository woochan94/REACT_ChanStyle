import React from "react";
import styled from "styled-components";
import { MyPage, MyTitleDiv, MyNavDiv } from "../Mypage/MyPagePresenter";
import { H2 } from "../Product/ProductPresenter";
import Button from './../../Components/Button';
import EditProduct from "../../Components/EditProduct";
import Loader from "../../Components/Loader";
import ProductEditForm from "../../Components/ProductEditForm";

const Admin = styled(MyPage)``;

const AdminWrapper = styled.div`
    @media (max-width: 1024px) {
        padding: 0 50px;
    }
    @media (max-width: 700px) {
        padding: 0 20px;
    }
    @media (max-width: 350px) {
        padding: 0 10px;
    }
`;

const Article = styled.article``;

const NavDiv = styled(MyNavDiv)`
    grid-template-columns: repeat(2, 1fr);
`;

const EditBox = styled.article`
    padding: 30px 0;
`;

const EditGrid = styled.div`
    display: grid; 
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 25px;
    position: relative;
    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Modal = styled.div`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
    background-color: #fefefe;
    margin: 20% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 90%;    
    position: relative;  
    #close {
        position: absolute; 
        right: 10px;
        top: 5px;
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    } 
    @media(max-width: 768px) {
        margin: 30% auto;
    }
    @media(max-width: 600px) {
        margin: 40% auto;
    }
    @media(max-width: 486px) {
        margin: 60% auto;
    }
`;

export default ({
    logOut,
    customFileBtn,
    selectChange,
    subSelectChange,
    smallClassification,
    addTable,
    onSubmit,
    previewImg,
    tab,
    clickTab,
    editData,
    editClick,
    deleteClick,
    editData2,
    previewEditImg,
    customEditFileBtn
}) => {
    return (
        <Admin>
            <AdminWrapper>
                <MyTitleDiv>
                    <H2>Admin</H2>
                    <Button text={"LogOut"} onClick={() => logOut()} />
                </MyTitleDiv>
                <NavDiv>
                    <button onClick={() => clickTab("enrollment")}
                        style={tab === "enrollment" ?
                            { borderColor: "#ccc", borderBottom: "1px solid #fff", marginBottom: "-1px" } :
                            { borderColor: "transparent" }} >
                        상품 등록
                        </button>
                    <button onClick={() => clickTab("edit")}
                        style={tab === "edit" ?
                            { borderColor: "#ccc", borderBottom: "1px solid #fff", marginBottom: "-1px" } :
                            { borderColor: "transparent" }} >
                        상품 수정
                        </button>
                </NavDiv>
                {tab === "enrollment" && (
                    <Article>
                        <ProductEditForm 
                            onSubmit={onSubmit}
                            previewImg={previewImg}
                            customFileBtn={customFileBtn}
                            selectChange={selectChange}
                            subSelectChange={subSelectChange}
                            smallClassification={smallClassification}
                            addTable={addTable}
                        />
                    </Article>
                )}
                {tab === "edit" && editData === undefined && <Loader />}
                {tab === "edit" && editData && (
                    <EditBox>
                        <EditGrid>
                            {editData.seeProductAll.map(item => (
                                <EditProduct
                                    key={item.id}
                                    img={item.files[0].url}
                                    name={item.name}
                                    mainCategory={item.mainCategory}
                                    subCategory={item.subCategory}
                                    price={item.price}
                                    sizes={item.sizes}
                                    colors={item.colors}
                                    stocks={item.stocks}
                                    editClick={editClick}
                                    id={item.id}
                                    deleteClick={deleteClick}
                                />
                            ))}
                        </EditGrid>
                    </EditBox>
                )}
                <Modal id={"modal"}>
                    <ModalContent>
                        <span id={"close"}>&times;</span>
                        {editData2 === undefined && <Loader />}
                        {editData2 !== undefined && (
                            <ProductEditForm 
                                onSubmit={onSubmit}
                                previewImg={previewEditImg}
                                customFileBtn={customEditFileBtn}
                                selectChange={selectChange}
                                subSelectChange={subSelectChange}
                                smallClassification={smallClassification}
                                addTable={addTable}
                                editData2={editData2}
                            />
                        )}
                    </ModalContent>
                </Modal>
            </AdminWrapper>
        </Admin>
    )
}
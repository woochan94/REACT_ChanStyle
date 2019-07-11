import React from "react"; 
import styled from "styled-components"; 
import { MyPage, MyTitleDiv } from "../Mypage/MyPagePresenter";
import { H2 } from "../Product/ProductPresenter";
import Button from './../../Components/Button';
import Input from "../../Components/Input";
import { Select } from "../../Components/SignUpForm";
import { Plus } from "../../Components/Icons";
import { Image } from './../../Components/Icons';

const Admin = styled(MyPage)``;

const AdminWrapper = styled.div`
    @media (max-width: 1024px) {
        padding: 0 50px;
    }
    @media (max-width: 600px) {
        padding: 0 20px;
    }
    @media (max-width: 350px) {
        padding: 0 10px;
    }
`;

const EnrollmentTitle = styled.div`
    margin-top: 50px; 
    border-bottom: 1px solid #ccc;
    h3 {
        font-size: 18px;
        padding-bottom: 15px;
        font-weight: 600;
    }
`;

const Form = styled.form``;

const ProductBasicDiv = styled.div`
    display:flex;
    justify-content: center;
    padding: 30px 0;
    border-bottom: 1px solid #ccc;
    @media(max-width: 480px) {
        flex-direction: column; 
        align-items: center; 
    }
`;

const Article = styled.article``;

const ImageDiv = styled.div`
    width: 30%;
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 480px) {
        margin-bottom: 30px;
    }
`;

const BasicDiv = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
    @media (max-width: 480px) {
        width: 80%;
    }
    input {
        margin-bottom: 15px;
        @media (max-width: 720px) {
            margin-left: 20px;
        }
    }
    select {
        @media (max-width: 720px) {
            margin-left: 20px;
        }
    }
`;

const Preview = styled.div`
    width: 150px; 
    height: 200px;
    background-color: white;
    ${props => props.theme.whiteBox};
    border-radius: 0;
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%; 
`;

const ImageButton = styled.div`
    width: 150px;
    background-color: #eeeeee; 
    border: none; 
    border-radius: 20px; 
    cursor: pointer;
    padding: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        &:first-child {
            margin-right: 10px;
        }
    }
`;

const SortDiv = styled.div`
    display: flex; 
    justify-content: space-between;
    select {
        padding: 7px;
        width: 45%;
    }
`;

const OptionTitleDiv = styled.div`
    margin: 30px 0;
    h4 {
        font-size: 14px;
        font-weight: 600;
    }
`;

const OptionDiv = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        border-bottom: 1px solid #ccc;
        tr {
            border-top: 1px solid #ccc;
        }
        th, td {
            border-right: 1px solid #ccc;
            text-align: center;
            &:last-child { 
                border-right: 0;
            }
        }
        thead {
            tr {
                background-color: ${props => props.theme.confirmColor}; 
                color: #fff;
            }
            th {
                padding: 10px 0;
            }
        }
        tbody {
            td {
                margin: 5px 0;
            }
            input {
                width: 100%;
                height: 100%;
                border: none;
                outline-style: none;
                text-align: center;

            }
        }
    }
`;

const PlusDiv = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`;

const EnrollmentButton = styled.button`
    width: 100%; 
    border: none; 
    border-radius: 5px; 
    padding: 8px 0;
    background-color: ${props=> props.theme.confirmColor}; 
    color: #fff;
    cursor: pointer;
    margin: 50px 0 20px;
`;

export default ({
    logOut,
    customFileBtn,
    selectChange,
    subSelectChange,
    smallClassification,
    addTable,
    onSubmit,
    previewImg
}) => {
    return (
        <Admin>
            <AdminWrapper>
                <MyTitleDiv>
                    <H2>Admin</H2>
                    <Button text={"LogOut"} onClick={() => logOut()} />
                </MyTitleDiv>
                <EnrollmentTitle>
                    <h3>상품 등록</h3>
                </EnrollmentTitle>
                <Article>
                    <Form onSubmit={(e) =>onSubmit(e)}>
                        <ProductBasicDiv>
                            <ImageDiv>
                                <Preview>
                                    <PreviewImage id={"previewImg"} ref={previewImg} src="https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif"/>
                                </Preview>
                                <input type="file" id={"fileInput"} accept={"image/*"} hidden={true}/>
                                <ImageButton onClick={() => customFileBtn()}>
                                    <span><Image /></span>
                                    <span>이미지 선택</span>
                                </ImageButton>
                            </ImageDiv>
                            <BasicDiv>
                                <Input placeholder={"Name"} id={"Name"}/>
                                <Input placeholder={"Price"} id={"Price"}/>
                                <SortDiv>
                                    <Select onChange={(e) => selectChange(e)}>
                                        <option value="0">대분류</option>
                                        <option value="상의">상의</option>
                                        <option value="하의">하의</option>
                                    </Select>
                                    <Select onChange={(e) => subSelectChange(e)}>
                                        <option value="0">소분류</option>
                                        {smallClassification.map((item,index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </Select>
                                </SortDiv>
                            </BasicDiv>
                        </ProductBasicDiv>
                        <OptionTitleDiv>
                            <h4>옵션</h4>
                        </OptionTitleDiv>
                        <OptionDiv>
                            <table>
                                <thead>
                                    <tr>
                                        <th>색상</th>
                                        <th>사이즈</th>
                                        <th>재고량</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                    <tr>
                                        <td><input type="text" className={"color"}/></td>
                                        <td><input type="text" className={"size"}/></td>
                                        <td><input type="text" className={"stock"} /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" className={"color"}/></td>
                                        <td><input type="text" className={"size"} /></td>
                                        <td><input type="text" className={"stock"} /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" className={"color"}/></td>
                                        <td><input type="text" className={"size"} /></td>
                                        <td><input type="text" className={"stock"} /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" className={"color"}/></td>
                                        <td><input type="text" className={"size"} /></td>
                                        <td><input type="text" className={"stock"} /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" className={"color"}/></td>
                                        <td><input type="text" className={"size"} /></td>
                                        <td><input type="text" className={"stock"} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </OptionDiv>
                        <PlusDiv onClick={() => addTable()}>
                            <Plus/>
                        </PlusDiv>
                        <EnrollmentButton> 등록 </EnrollmentButton>
                    </Form>
                </Article>
            </AdminWrapper>
        </Admin>
    )
}
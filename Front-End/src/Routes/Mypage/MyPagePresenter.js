import React from "react";
import styled from "styled-components";
import { TitleDiv, H2 } from "../Product/ProductPresenter";
import Button from "../../Components/Button";
import { Form } from "../Auth/AuthPresenter";
import SignUpForm from "../../Components/SignUpForm";
import Loader from "../../Components/Loader";
import { Link } from 'react-router-dom';

const MyPage = styled.section`
    min-height: 79vh;
    overflow: hidden;
`;

const MyPageWrapper = styled.div`
    #cartOrderBtn {
        width: auto; 
        padding: 10px 35px;
        float: right;
        margin: 20px 0;
        @media (max-width: 600px) {
            width: 100%;
            margin: 20px 0 60px 0;
        }
    }
    #responsiveTotalDiv {
        @media (min-width: 600px) {
            display: none;
        }
    }
    @media (max-width: 1024px) {
        padding: 0 50px;
    }
    @media (max-width: 600px) {
        padding: 0 20px;
    }
`;

const MyPageHeader = styled.header``;

const MyTitleDiv = styled(TitleDiv)`
    display: flex; 
    justify-content: space-between;
    button {
        width: auto;
    }
`;

const MyNavDiv = styled.div`
    display: grid; 
    grid-template-columns: repeat(3, 1fr);
    padding: 30px 0 0; 
    border-bottom: 1px solid #ccc;
    button {
        border: 1px solid transparent; 
        border-bottom: 0; 
        cursor: pointer; 
        font-weight: 600;
        background-color: transparent;
        font-size: 18px;
        outline: none;
        padding: 15px;
        @media (max-width: 600px) {
            padding: 10px;
        }
        :hover {
            color: ${props => props.theme.confirmColor};
        }
    }
`;

const Article = styled.article`
    margin-top: 60px;
    form {
        margin: 0 auto;
    }
`;

const Table2 = styled.table`
    width: 100%;
    img {
        width: 130px;
        height: 150px;
    }
    td, th {
        padding: 10px; 
        vertical-align: middle;
    }
    td {
        text-align: center;
        vertical-align: middle;
    }
    thead {
        background-color: ${props => props.theme.confirmColor}; 
        color: white;
    }
    tbody {
        tr {
            border-bottom: 1px solid #ccc;
        }
        #emptyTd {
            padding: 50px 0;
            @media (max-width: 600px) {
                display: none;
            }
        }
    }
    tfoot {
        tr {
            border-bottom: 1px solid #ccc;
        }
        @media (max-width: 600px) {
            display: none;
        }
    }
    @media (max-width: 600px) {
        display: block;
        thead {
            display: none;
        }
        img {
            width: 100px;
        }
        tr {
            display: block;
            margin: 0.5rem 0;
            padding: 0;
            width: 100%;
            position:relative;
            border-radius: 10px;
            border: 1px solid #ccc;
        }
        tbody {
            display: flex; 
            flex-direction: column; 
            justify-content: center;
            align-items: center;
        }
        td:first-child {
            position: relative;
            top: 0;
            transform: translateY(0);
            width: 100%;
            background-color: ${props => props.theme.confirmColor};
            border-radius: 10px 10px 0 0;
            border-color: ${props => props.theme.confirmColor}; 
            border : 1px solid;
        }
        td {
            display: block;
            :nth-child(2) {
                position:absolute !important;
                left: 0;
                width: auto !important;
                height: 180px;
                border-right: 1px solid #ccc;
            }
        }
        td {
            :not(:first-child):not(:nth-child(2)) {
                position: relative;
                margin-left: 125px;
                padding: 5px 1em; 
                text-align: left; 
                width: 100%;
            }
        }
        td:not(:first-child):before {
            content: '';
            display: block;
            left: 0;
            position: relative;
            font-size: .8em;
            padding-bottom: 0.3em;
            text-align: left;
            color: darkgray;
        }
        td:nth-child(3):before {
            content: 'Name (Option)';
        }
        td:nth-child(4):before {
            content: 'Price';
        }
        td:nth-child(5):before {
            content: 'Quantity';
        }
    }   
`;

const ResponsiveTotalDiv = styled.div`

`;

export default ({
    tab,
    clickTab,
    onSubmit,
    name,
    email,
    password,
    confirmPassword,
    zipCode,
    address,
    addressDetail,
    phone1,
    phone2,
    phone3,
    open,
    setOpen,
    handleAddress,
    cartLoading,
    cartData,
    passCartId,
    allCheck
}) => {
    return (
        <MyPage>
            <MyPageWrapper>
                <MyPageHeader>
                    <MyTitleDiv>
                        <H2>My Page</H2>
                        <Button text={"LogOut"} onClick={() => console.log("logout")} />
                    </MyTitleDiv>
                    <MyNavDiv>
                        <button onClick={() => clickTab("cart")}
                            style={tab === "cart" ?
                                { borderColor: "#ccc", borderBottom: "1px solid #fff", marginBottom: "-1px" } :
                                { borderColor: "transparent" }} >
                            Cart
                        </button>
                        <button onClick={() => clickTab("buyList")}
                            style={tab === "buyList" ?
                                { borderColor: "#ccc", borderBottom: "1px solid #fff", marginBottom: "-1px" } :
                                { borderColor: "transparent" }} >
                            buyList
                        </button>
                        <button onClick={() => clickTab("editProfile")}
                            style={tab === "editProfile" ?
                                { borderColor: "#ccc", borderBottom: "1px solid #fff", marginBottom: "-1px" } :
                                { borderColor: "transparent" }} >
                            editProfile
                        </button>
                    </MyNavDiv>
                </MyPageHeader>
                {tab === "cart" ?
                    <>
                        <Article>
                            {cartLoading === true && <Loader />}
                            {cartLoading === false && (
                                <>
                                    <Table2>
                                        <thead>
                                            <tr>
                                                <th scope="col"><input type="checkBox" onChange={(e) => allCheck(e.target.checked)}/></th>
                                                <th scope="col">product</th>
                                                <th scope="col">Name (Option) </th>
                                                <th scope="col">price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">select</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartData.seeCart.length === 0 && (
                                                <tr>
                                                    <td id={"emptyTd"} colSpan="6">장바구니가 비어있습니다.</td>
                                                </tr>
                                            )}
                                            {cartData.seeCart.map((item, index) => (
                                                item.product.map(product => (
                                                    product.files.map(file => (
                                                        <tr key={index} >
                                                            <td><input id={item.id} type="checkBox" onChange={(e) => e.target.checked && console.log(e.target.id)} /></td>
                                                            <td>
                                                                <Link to={`/product/${product.id}`}>
                                                                    <img src={file.url} alt={file.id} />
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/product/${product.id}`}>
                                                                    <div>
                                                                        {product.name}
                                                                    </div>
                                                                    {item.size}/{item.color}
                                                                </Link>
                                                            </td>
                                                            <td>{product.price}</td>
                                                            <td>{item.count}</td>
                                                            <td><button onClick={() => passCartId(item.id)}>삭제</button></td>
                                                        </tr>
                                                    ))
                                                ))
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="1">Total</td>
                                                <td colSpan="4"></td>
                                                <td colSpan="1">가격</td>
                                            </tr>
                                        </tfoot>
                                    </Table2>
                                    <ResponsiveTotalDiv id={"responsiveTotalDiv"}>
                                        Total : 가격
                                    </ResponsiveTotalDiv>
                                    <Button id={"cartOrderBtn"} text={"Order Now"} />
                                </>
                            )}
                        </Article>
                    </>
                    :
                    tab === "buyList" ?
                        <div>
                            buyList
                        </div> :
                        <Article>
                            <Form>
                                <SignUpForm
                                    onSubmit={onSubmit}
                                    name={name}
                                    email={email}
                                    ButtonText={"Edit Profile"}
                                    password={password}
                                    confirmPassword={confirmPassword}
                                    zipCode={zipCode}
                                    address={address}
                                    addressDetail={addressDetail}
                                    phone1={phone1}
                                    phone2={phone2}
                                    phone3={phone3}
                                    open={open}
                                    setOpen={setOpen}
                                    handleAddress={handleAddress}
                                />
                            </Form>
                        </Article>
                }
            </MyPageWrapper>
        </MyPage>
    )
}
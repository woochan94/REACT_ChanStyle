import React from "react";
import styled from "styled-components";
import { TitleDiv, H2, SelectedCountBtnDiv, SelectedCountTextDiv, SelectedCount } from "../Product/ProductPresenter";
import Button from "../../Components/Button";
import { Form } from "../Auth/AuthPresenter";
import SignUpForm from "../../Components/SignUpForm";
import Loader from "../../Components/Loader";
import { Link } from 'react-router-dom';
import { Pagination } from "semantic-ui-react";

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
    @media (max-width: 350px) {
        padding: 0 10px;
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

const Table = styled.table`
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
    tbody {
        tr {
            border-bottom: 1px solid #ccc;
        }
        #emptyTd {
            padding: 50px 0;
            @media (max-width: 600px) {
                display: block;
                border-radius: 10px; 
                background-color: transparent; 
                border-color: #ccc;
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

const SelectedCountTextDiv2 = styled(SelectedCountTextDiv)`
    padding: 5px 15px;
    @media (max-width: 600px) {
        width: auto;
    }
`;
const SelectedCount2 = styled(SelectedCount)`
    @media (max-width: 600px) {
        margin-left: 0;
        justify-content: left;
    }
`;

const BuyListTable = styled.table`
    width: 100%; 
    tbody {
        text-align: center; 
        tr {
            border-bottom: 1px solid #ccc;
            td {
                padding: 10px;
            }
        }
    }
`;

const Thead = styled.thead`
    background-color: ${props => props.theme.confirmColor}; 
    color: white; 
`;

const Th = styled.th`
    padding: 10px; 
    vertical-align: middle;
`;

const PageDiv = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    div {
        min-height: 0 !important;
        box-shadow: none !important;
        a{
            padding: 5px 7px !important;
            min-width: 0 !important;
        }
    }
`;

export default ({
    tab,
    clickTab,
    // 장바구니 
    cartLoading,
    cartData,
    passCartId,
    allCheck,
    total,
    cartCountUp,
    cartCountDown,
    count,
    selectOrder,
    // 구매목록 
    buyData,
    changePage,
    buyListLoading,
    pageNum,
    // 개인정보 수정 
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
    // 로그아웃 
    logOut
}) => {
    return (
        <MyPage>
            <MyPageWrapper>
                <MyPageHeader>
                    <MyTitleDiv>
                        <H2>My Page</H2>
                        <Button text={"LogOut"} onClick={() => logOut()} />
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
                                    <Table>
                                        <Thead>
                                            <tr>
                                                <Th scope="col"><input type="checkBox" onChange={(e) => allCheck(e.target.checked)}/></Th>
                                                <Th scope="col">product</Th>
                                                <Th scope="col">Name (Option) </Th>
                                                <Th scope="col">price</Th>
                                                <Th scope="col">Quantity</Th>
                                                <Th scope="col">select</Th>
                                            </tr>
                                        </Thead>
                                        <tbody>
                                            {cartData.seeCart.length === 0 && (
                                                <tr>
                                                    <td id={"emptyTd"} colSpan="6">장바구니가 비어있습니다.</td>
                                                </tr>
                                            )}
                                            {cartData.seeCart.map((item, index) => (
                                                item.product.map((product, index2) => (
                                                    product.files.map(file => (
                                                        <tr key={index} >
                                                            <td><input id={item.id} type="checkBox" onChange={(e) => e.target.checked} /></td>
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
                                                                    {item.sizeId[index2].size}/{item.colorId[index2].color}
                                                                </Link>
                                                            </td>
                                                            <td>{product.price}</td>
                                                            <td>
                                                                <SelectedCount2>
                                                                    <SelectedCountTextDiv2>{count[index]}</SelectedCountTextDiv2>
                                                                    <SelectedCountBtnDiv>
                                                                        <Button text={"▲"} onClick={() => cartCountUp(index)}/>
                                                                        <Button text={"▼"} onClick={() => cartCountDown(index)} />
                                                                    </SelectedCountBtnDiv>
                                                                </SelectedCount2>
                                                            </td>
                                                            <td><button onClick={() => passCartId(item.id)}>삭제</button></td>
                                                        </tr>
                                                    ))
                                                ))
                                            ))}
                                        </tbody>
                                        {!isNaN(total) && (
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="1">Total</td>
                                                    <td colSpan="4"></td>
                                                    <td colSpan="1">{total}</td>
                                                </tr>
                                            </tfoot>
                                        )}
                                    </Table>
                                    <ResponsiveTotalDiv id={"responsiveTotalDiv"}>
                                        Total : {total}
                                    </ResponsiveTotalDiv>
                                    <Button id={"cartOrderBtn"} text={"Order Now"} onClick={() => selectOrder()} />
                                </>
                            )}
                        </Article>
                    </>
                    :
                    tab === "buyList" ?
                        <Article>
                            {buyData === "" && <Loader />}
                            {buyData !== "" && 
                                <BuyListTable>
                                    <Thead>
                                        <tr>
                                            <Th scope="col">num</Th>
                                            <Th scope="col">Name(option)</Th>
                                            <Th scope="col">Price</Th>
                                            <Th scope="col">Quantity</Th>
                                        </tr>
                                    </Thead>
                                    <tbody>
                                        {buyData.seeBuyList2.map((item, index) => (
                                            item.product.map(product => (
                                                <tr key={product.id}>
                                                    <td>{index}</td>
                                                    <td>
                                                        {product.name}
                                                    </td>
                                                    <td>
                                                        {product.price*item.count} 
                                                    </td>
                                                    <td>
                                                        {item.count}
                                                    </td>
                                                </tr>
                                            ))
                                        ))}
                                    </tbody>
                                </BuyListTable>
                            }
                            {buyListLoading === false && 
                                <PageDiv>
                                    <Pagination 
                                        boundaryRange={0}
                                        defaultActivePage={1}
                                        ellipsisItem={null}
                                        firstItem={null}
                                        lastItem={null}
                                        siblingRange={1}
                                        totalPages={pageNum}
                                        onPageChange={(e) => changePage(e.target.attributes.value.value)}
                                    />
                                </PageDiv>
                            }               
                        </Article> :
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
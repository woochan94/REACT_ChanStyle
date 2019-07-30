import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Button from './../../Components/Button';
import Scroll from "react-scroll"; 
import { UpArrowIcon, CartIcon, CloseIcon } from './../../Components/Icons';
import { Link } from "react-router-dom";
import { addComma } from "../../Components/SharedFunction";

const animationScroll = Scroll.animateScroll;

const options = {
    smooth: true,
    duration: "300"
}

const Product = styled.section`
    min-height: 79vh;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    width: 100%; 
`

const ProductWrapper = styled.div`
    @media (max-width: 1024px) {
        padding: 0 50px;
    }
    @media (max-width: 700px) {
        padding: 0 20px;
    }
`;

const Section = styled.section`
    margin-top: 20px;
`;

export const TitleDiv = styled.div`
    border-bottom: ${props => props.theme.borderBottom};
    padding: 20px 0 10px;
`;

export const H2 = styled.h2`
    font-size: ${props => props.theme.titleFontSize};
    font-weight: 600;
`;

const H3 = styled.h3`
    font-size: 20px;
    font-weight: 500;
    margin-right: 10px;
`;

const ProductDiv = styled.div`
    display: grid; 
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 70px;
    padding: 40px 10px;
    @media (max-width: 700px) {
        grid-template-columns: 1fr; 
        height: 100%; 
        grid-row-gap: 50px;
    }
`;

const ProductImgDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductImg = styled.img`
    width: 100%; 
    ${props => props.theme.whiteBox};
`;

const SizeDiv = styled.div`
    margin-top: 10px;
    @media (max-width: 700px) {
        display: none;
    }
`;

const SizeTitleDiv = styled.div`
    border-bottom: ${props => props.theme.boxBorder};
    padding: 10px;
    margin-bottom: 10px;
`;

const SizeImg = styled.img`
    width: 100%;
`;

const ProductNameDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content: center;
    align-items: center;
    span {
        font-weight: 600;
    }
`;

const ProductPriceDiv = styled(ProductNameDiv)`
    padding: 15px 0;
    border-bottom: ${props => props.theme.boxBorder};
    margin-bottom: 20px;
`;

const SelectOptionDiv = styled.div`
    padding: 15px 0;
    border-bottom: ${props => props.theme.boxBorder};
`;

const OptionBox = styled.div`
    ${props => props.theme.whiteBox}; 
    background-color: transparent;
    margin: 15px 0;
    padding: 15px;
`;

const ColorDiv = styled(ProductNameDiv)`
    margin-bottom: 10px;
    @media(max-width: 768px) {
        grid-template-columns: 2.5fr 4fr;
    }
`;

const SizeOptionDiv = styled(ProductNameDiv)`
    @media(max-width: 768px) {
        grid-template-columns: 2.5fr 4fr;
    }
`;

const Select = styled.select`
    width: 100%;
    height: 35px;
    ${props => props.theme.whiteBox};
    padding: 0 5px;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const TotalDiv = styled(ProductNameDiv)`
    padding: 15px 0;
    margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
    #OrderBtn {
        background-color: ${props => props.theme.confirmColor};
        color: white;
    }
`;

const Form = styled.form`
    display: grid; 
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 20px;

    button {
        padding: 20px 10px;
    }
`;

const SelectedDiv = styled.div`
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    padding: 26px 0; 
    border-bottom: ${props => props.theme.boxBorder};
`;

const SelectedItem = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
        margin-bottom: 5px;
    }
`;

export const SelectedCount = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    margin-left: 15%;
`;

export const SelectedCountTextDiv = styled.div`
    background-color: white;
    height: 30px;
    width: 100%;
    display: flex; 
    text-align: center;
    justify-content: center;
    align-items: center;
    ${props => props.theme.whiteBox};
    padding-left: 50%;
`;

export const SelectedCountBtnDiv = styled.div` 
    display: flex;
    flex-direction: column;
    button {
        width: 20px; 
        padding: 0;
        font-size: 12px;
    }
`;

const SelectedPrice = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
`;

const ProductDetailDiv = styled.div`
    border-top: ${props => props.theme.borderBottom};
    min-height: 100vh;
`;


const TopBtn = styled.div`
    width: 50px;
    height: 50px; 
    border-radius: 50%; 
    position: fixed; 
    bottom: 30px;
    right: 30px;
    background-color:#DDDDDD;
    cursor: pointer;
    z-index: 9000;
`;

const TopBtnDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5px;
`;

const DeleteButton = styled.button`
    background-color: transparent; 
    border: none;
    cursor: pointer;
    outline: none;
`;

const ConfirmDiv = styled.div`
    display: grid;
    position: absolute; 
    background-color: #fff;
    grid-template-rows: 1fr 5fr 2fr;  
    top: 30%; 
    left: 30%; 
    width: 40%; 
    height: 40%;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 0px rgba(0,0,0,0), 0px 0px 10px rgba(0,0,0,0.1);
    @media (max-width: 900px) {
        width: 50%; 
        left: 25%;
    }
    @media (max-width: 768px) {
        width: 70%; 
        left: 20%;
    }
    @media (max-width: 700px) {
        height: 35%;
        width: 75%;
        left: 12%;
    }
    @media (max-width: 480px) {
        width: 100%; 
        left: 0;
    }
`;

const ConfirmCloseDiv = styled.div`
    display: flex; 
    justify-content: flex-end; 
    align-items: center;
    padding-right: 5px; 
`;

const ConfirmContentDiv = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    padding-top: 50px; 
    span {
        padding-top: 30px;
        font-weight: 600;
        @media (max-width: 400px) {
            padding: 30px; 
            text-align: center;
        }
    }
`; 

const ConfirmButtonDiv = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center;
    button {
        width: auto;
        margin: 0 10px;
        &:first-child {
            background-color: ${props => props.theme.confirmColor} !important;
            color: #fff;


        }
        @media (max-width: 400px) {
            font-size: 14px;
        }
    } 
`;

const ConfirmIconDiv = styled.div`
    cursor: pointer;
`;

const Span = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default ({
    data,
    loading,  
    uniqColor,
    colorSelectOnChange,
    color,
    option,
    sizeSelectOnChange,
    selected,
    count,
    decrement,
    increment,
    total,
    scroll,
    deleteSelect,
    addCart,
    success,
    confirmClose,
    myId, 
    addPayment
}) => {
    return (
        <Product>
            {loading && <Loader />}
            {!loading && 
                <ProductWrapper>
                    {scroll.y >= 100 && 
                        <TopBtn onClick={() => animationScroll.scrollToTop(options)}>
                            <TopBtnDiv>
                                <UpArrowIcon />
                            </TopBtnDiv>
                        </TopBtn>
                    }
                    {data.map(item => (
                        <Section key={item.id}>
                            <TitleDiv>
                                <H2>{item.name}</H2>
                            </TitleDiv>
                            <ProductDiv>
                                <ProductImgDiv>
                                    {item.files.map(file => (
                                        <ProductImg 
                                            key={file.id}
                                            src={file.url}
                                        />
                                    ))}
                                    <SizeDiv>
                                        <SizeTitleDiv>
                                            <H3>Size Info</H3>
                                        </SizeTitleDiv>
                                        {item.productSizeFile.map(sizeFile => (
                                            <SizeImg
                                                key={sizeFile.id}
                                                src={sizeFile.productSizeFile}
                                            />
                                        ))}
                                    </SizeDiv>
                                </ProductImgDiv>
                                <ProductInfoDiv key={item.id}>
                                    <ProductNameDiv>
                                        <H3>Name</H3>
                                        <Span>{item.name}</Span>
                                    </ProductNameDiv>
                                    <ProductPriceDiv>
                                        <H3>Price</H3>
                                        <span>￦{addComma(item.price)}</span>
                                    </ProductPriceDiv>
                                    < SelectOptionDiv>
                                        <H3>Select Option</H3>
                                        <OptionBox>
                                            <ColorDiv>
                                                <H3>Color</H3>
                                                <Select onChange={(e) => colorSelectOnChange(e)}>
                                                    <option value=""> Color </option>
                                                    {uniqColor.map(color => (
                                                        <option key={color.colorId} value={color.colors}>{color.colors}</option>
                                                    ))}
                                                </Select>
                                            </ColorDiv>
                                            <SizeOptionDiv>
                                                <H3>Size</H3>
                                                <Select
                                                    id={"selectSize"} 
                                                    disabled={color === "" ? true : false}
                                                    defaultValue={""}
                                                    onChange={(e) => sizeSelectOnChange(e)}
                                                >
                                                    <option value=""> Size </option>
                                                    {option.map(item => (
                                                        <option
                                                            key={item.sizeId} 
                                                            value={item.colors + "-" + item.colorId + "-" + item.sizes + "-" + item.sizeId + "-" + item.stocks + "-" + item.stockId}
                                                        >
                                                        {item.sizes} - 남은재고:{item.stocks}    
                                                        </option>
                                                    ))}
                                                </Select>
                                            </SizeOptionDiv>
                                        </OptionBox>
                                    </SelectOptionDiv>
                                    {selected.length > 0 && 
                                        selected.map((option, index) => {
                                            return (
                                                <SelectedDiv key={index}>
                                                    <SelectedItem>
                                                        <div>
                                                            {item.name}
                                                        </div>
                                                        ({option.color}/{option.size})
                                                    </SelectedItem>
                                                    <SelectedCount>
                                                        <SelectedCountTextDiv>{count[index]}</SelectedCountTextDiv>
                                                        <SelectedCountBtnDiv>
                                                            <Button text="▲" onClick={() => increment(index,item)} />
                                                            <Button text="▼" onClick={() => decrement(index,item)}/>
                                                        </SelectedCountBtnDiv>
                                                    </SelectedCount>
                                                    <SelectedPrice>
                                                        {addComma(item.price*count[index])}
                                                        <DeleteButton onClick={() => deleteSelect(index, selected) }><span role="img" aria-label="">❌</span></DeleteButton>
                                                    </SelectedPrice>
                                                </SelectedDiv>
                                            )
                                        })
                                    }
                                    <TotalDiv>
                                        <H3>Total</H3>
                                        <span>￦{addComma(total)}</span>
                                    </TotalDiv>
                                    <ButtonDiv>
                                        <Form>
                                            <Button text="Cart" onClick={() => addCart(selected, item, count)}/>
                                            <Button id={"OrderBtn"} text={"Order Now"} onClick={() => addPayment(selected, item, count)} />
                                        </Form>
                                    </ButtonDiv>
                                </ProductInfoDiv>
                                {success && (
                                    <ConfirmDiv>
                                        <ConfirmCloseDiv>
                                            <ConfirmIconDiv onClick={() => confirmClose()}>
                                                <CloseIcon/>
                                            </ConfirmIconDiv>
                                        </ConfirmCloseDiv>
                                        <ConfirmContentDiv>
                                            <CartIcon />
                                            <span>장바구니에 상품이 성공적으로 담겼습니다.</span>
                                        </ConfirmContentDiv>
                                        <ConfirmButtonDiv>
                                            <Link to={`/${myId}`} >
                                                <Button text={"장바구니 이동"} />
                                            </Link>
                                            <Button text={"쇼핑 계속하기"} onClick={() => confirmClose()}/>
                                        </ConfirmButtonDiv>
                                    </ConfirmDiv>
                                )}
                            </ProductDiv>
                            <ProductDetailDiv />
                        </Section>
                    ))}
                </ProductWrapper>
            }
        </Product>
    )
}
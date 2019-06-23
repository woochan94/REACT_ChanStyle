import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Button from './../../Components/Button';

const Product = styled.section`
    min-height: 79vh;
`

const ProductWrapper = styled.div`
    @media (max-width: 1024px) {
        padding: 0 50px;
    }
    @media (max-width: 600px) {
        padding: 0 20px;
    }
`;

const Section = styled.section`
    margin-top: 20px;
`;

const TitleDiv = styled.div`
    border-bottom: ${props => props.theme.borderBottom};
    padding: 20px 0;
`;

const H2 = styled.h2`
    font-size: ${props => props.theme.titleFontSize};
    font-weight: 600;
`;

const H3 = styled.h3`
    font-size: 20px;
    font-weight: 500;
`;

const ProductDiv = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 70px;
    padding: 20px 10px;
    height: 50px;
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
    height: 35vh;
    ${props => props.theme.whiteBox};
`;

const SizeDiv = styled.div`
    margin-top: 10px;
`;

const SizeTitleDiv = styled.div`
    border-bottom: ${props => props.theme.boxBorder};
    padding: 10px;
    margin-bottom: 10px;
`;

const SizeImg = styled.img`
    width: 100%;
    height: 20vh;
`;

const ProductNameDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content: center;
    align-items: center;
`;

const ProductPriceDiv = styled(ProductNameDiv)`
    padding: 15px 0;
    border-bottom: ${props => props.theme.boxBorder};
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
`;

const SizeOptionDiv = styled(ProductNameDiv)``;

const Select = styled.select`
    width: 70%;
    height: 35px;
    ${props => props.theme.whiteBox};
`;

const SelectedDiv = styled.div`
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    padding: 15px 0; 
    border-bottom: ${props => props.theme.boxBorder};
`;

const SelectedItem = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SelectedCount = styled.div``;

const SelectedPrice = styled.div``;

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
`;

export default ({
    data,
    loading,
    option
}) => {
    return (
        <Product>
            {loading && <Loader />}
            {!loading &&
                <ProductWrapper>
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
                                {data.map(item => (
                                    <ProductInfoDiv key={item.id}>
                                        <ProductNameDiv>
                                            <H3>Name</H3>
                                            {item.name}
                                        </ProductNameDiv>
                                        <ProductPriceDiv>
                                            <H3>Price</H3>
                                            {item.price}
                                        </ProductPriceDiv>
                                        <SelectOptionDiv>
                                            <H3>Select Option</H3>
                                            <OptionBox>
                                                <ColorDiv>
                                                    <H3>Color</H3>
                                                    <Select>
                                                        {item.colors.map(color => (
                                                            <option key={color.id} value={color.color}>{color.color}</option>
                                                        ))}
                                                    </Select>
                                                </ColorDiv>
                                                <SizeOptionDiv>
                                                    <H3>Size</H3>
                                                    <Select>
                                                        {option.map(item => (
                                                            <option key={item.sizeId}>{item.sizes} - 남은재고:{item.stocks}</option>
                                                        ))}
                                                    </Select>
                                                </SizeOptionDiv>
                                            </OptionBox>
                                        </SelectOptionDiv>
                                        <SelectedDiv>
                                            <SelectedItem>
                                                <div>
                                                    {item.name}
                                                </div>
                                                color/Size
                                            </SelectedItem>
                                            <SelectedCount>2</SelectedCount>
                                            <SelectedPrice>3</SelectedPrice>
                                        </SelectedDiv>
                                        <TotalDiv>
                                            <H3>Total</H3>
                                            {item.price}
                                        </TotalDiv>
                                        <ButtonDiv>
                                            <Form>
                                                <Button text="Cart" />
                                                <Button id={"OrderBtn"}text={"Order Now"} />
                                            </Form>
                                        </ButtonDiv>
                                    </ProductInfoDiv>
                                ))}
                            </ProductDiv>
                        </Section>
                    ))}
                </ProductWrapper>
            }
        </Product>
    )
}
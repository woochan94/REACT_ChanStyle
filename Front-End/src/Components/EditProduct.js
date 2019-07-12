import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const EditProduct = () => {
    const ProductDiv = styled.div`
        ${props => props.theme.whiteBox};
        box-shadow: 0px 0px 0px rgba(0,0,0,0), 0px 0px 10px rgba(0,0,0,0.1);
        display: flex; 
        flex-direction: column;
        justify-content: space-between;
    `;

    const ProductInfo = styled.div`
        padding: 10px;
    `;

    const Img = styled.img`
        width: 100%;
        height: 250px;
    `;

    const ProductBasic = styled.div`
        margin-top: 10px;
        border-bottom: ${props => props.theme.boxBorder};
    `;

    const H4 = styled.h4`
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 5px;
    `;

    const Category = styled.p`
        font-size: 12px;
        padding-bottom: 5px;
    `;

    const Price = styled.p`
        font-size: 14px; 
        padding-bottom: 5px;
        font-weight: 600;
    `;

    const ProductOption = styled.div`
        padding-top: 5px;
    `;

    const H5 = styled.h5`
        font-weight: 600;
        font-size: 14px; 
        padding-bottom: 5px;
    `;

    const ProductOptionDiv = styled.div`
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        text-align: center;
        padding-bottom: 5px;
    `;

    const ButtonDiv = styled.div`
        display: flex; 
        flex-direction: column;
    `;

    const EditButton = styled.button`
        border: none; 
        width: 100%; 
        background-color: ${props => props.theme.confirmColor}; 
        color: #fff;
        padding: 5px 0;
        margin-bottom: 5px;
        cursor: pointer;
    `;

    const DeleteButton = styled.button`
        border: none; 
        width: 100%; 
        padding: 5px 0;
        background-color: firebrick;
        color: #fff;
        cursor: pointer;
    `;


    return (
        <ProductDiv>
            <ProductInfo>
                <Img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhISEhIQFRUVFhUWFRUVEA8VFQ8VFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dFx0tKy0tKy0rKysrLS0tKystLS0tLS0tLy0tLS0tLS0tNys3LSstNy0rKysrLS0tLTctLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIGAwQFBwj/xAA9EAACAQICBwUGAwYHAQAAAAAAAQIDEQQhBQYSMVFhcSJBgZGxEzKhwdHwB1LhI0JicrLxFBUWNEOCkmP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAgEQEBAAIDAAIDAQAAAAAAAAAAAQIRAyExEkEiMlEE/9oADAMBAAIRAxEAPwCI0PZCxkDYnmSsJlERpEkRCG0JsdxBQOIrhYgmho16+JhD3pJevkcmvrVQi7Xb6IqWyLBcUprc2l1aRW8brZSUNqm7y4NPIq+I07Vm23Lf1LMWbnI9JdSN7XT8USPNaOkav5pebOpgtYqkd9pLvTyfgx8SZxdiNzR0bpelWyjK0vyvJr6m/cy2jcy06hDZDZAy1Z7WeRiJoViiIEgAQXEJgANkZDQC8wJbXIYAhoECkESaMUjJKpdGNgRuFxSCwEkgGhNBQzQ0rpBU1z9DPj8UqcLvw5sp2Prubb4/AsjOV00NK6SlNtXduF/XicjebmJp/f0NanDNdTbl63auB2aSl3t5mjslsrUY1MPGK95dF0vlyK/PCOLaatzM41rLHSOHlz+BuTV1z48TVUbb7cn9GZXKxpklk7ptNcHnHoWLQ2tFpezxDy/dqcP5/qVipUz+8wqraV/tDRLp6tFpq6zGUvUzTjTWHqPL/jb7n+R8uBdDnY7S7FhpDsAVGwmSYgIyIkyLCbIHIGyDYGS4ENoAMm0JDgO2YREUkZJRIuICig2CUUEkBGwpW3368iRx9aMb7KhLPOfZXjvfkNLvpwdK6S9rNu/ZWUVy4+Jz6ldNWXj1+Zx62Kb++4MPUd0jo5XboVU27LfxOzobQW3bK/PiYdE4b2klsrLd9T03QujFCK4+nQ455/T08fHPa4mE0DaytHwjbzNTTWr+0m4rNfE9Gp4ZWNbE4ZcDHfrr148UxOFcL3jl8Ec+c17r8P7nrek9CRlmoq5UNMarZNwTX8L3eDXum5yf1yz4N9xS5cCdKXdxMmIw8otqSacfivv1Rgqo7S7eWyxGqnGV07NPJ8Gs0z1DQWkViKEKn726a4SW/wCvieYVnez5He1G0hsVnSfu1PhNbvhdEsXGvQk2KwJg2YdCYkwsFgE0RsSsJoCEkRZksRmFIBABlRNRIxGEEmKTJEbAAkOw0BBlK/EDFZ06fBNvxLtJHmGtNbbxE/IsZtcdGxg4XaMNi56haB9rL2s12Vu5lyupswnyy0s+pehtmMZSRfcNSsaNFRgu5JEv86oR31Innnfb2W6mnWSNeujRhrHh5O0ZpvkZo4uM9xqpCnA0MXSTRvzkc7G4uEfeaRlqdKXrDo1N3SzXzKNpCnsv7+/7HpeksbRkveX33FF07TjJycXf7+/M68d+nDmkvbhp3QYeq4SUlvi014O5CmyJ1eV6/gq6qQhNbpJPzRnsVzUbFbVDYbzg2vDevUsTMOsSZFoaYmRTEwuK5QiLRKxC5AWALgBlihgFgCxGxIdihJBYEiYRrYyezCT4I8n0nO9WT5/I9N0/UtSa4lUeCoRwtWbpqpWqOey3msPGOytq3Hf5jelmNyVOCu0j2fUfDKNCNjyjCYFpxvlueZ7TqpQtRj0Mcl6dOGarNPR23LaqTdu6MckvHvMFbQ2F/eSfWTZPWL26g/YxTb728orjzKZprRlVU4VE5V5qUtuDnKK2XFpOME9yfDMxjN/btl1N62s9LRmHv2O7nex2MFhFHcec6pYevTSlOU7uVtiW02o23tZ2zPUNFUm43ZLO9LLub8amPqbKZXZ4d1299ix6x07RyOBPESo0Zzim5KygrN3lJ2V7dyvfwBPGriNW6Mc5yfS6RU9OYWnB9jdmt98rffkY9aXiVV9nerJp3VSM57NVSSstlZRtmaOPozg85Xut17tcc/M6SXfrjndy9OG8m+opBV3iZ2eVadQcRarOH5o38v7l8PLtVK+xiab43Xmj1BszW8TQ2JA2RoiI2xAOwmiRGTIIAFwAzEkCQJgOwJEkJlCuDAAOFrJLu4L1y+pg1QUZuvTkk70pNJr8y2X/AE3IafnnLrbyV36mvqXVSxii/wB6NSK57nZc7NvwJn+rfHfzh4jR1R/tJdzSfZtmuLWT6npOg1alBcl6GrpPDr2Dhs7lJbSW927+BPQNW9KHRHC16pjqu8o3NbEYCLNihUM843LEvVcrD6Jinex0o07ZE4NIhOpdl0zbtydZV+zb5HI0XNThY7em43hJcio6v4ntShwZmrHVxeBjLuKzp/REVBy70XWSyOBrDUXs5LkJW7Nx5DilaT6mNmbHLtvqYXu8j1x82+smCqbNSEuEovyZ65QleKfI8cR6voKvtUoP+FfBZ/IzWsW+hsaEyNIsGDFcCVyMmCEwIXAAA27C2SRCbIJoBdwgJWGKMhTlk2UVDS8s+rm/j+hX62InSqQqQdpRmpRfB2X0sdjSlTtNcI/M4mkNy6r5mozbp69onT9LEUYTl2NqLck3a1nsvPhe9uhHV+qtlqLTSbs07pq/ceZ6b0y8RQw9H2UI+yiobUVnOytmWT8OMX+z9m3nBteDzXzOGWGu3p4+b5WR6TSZtwnkaNKRswkZjraJ3ORpvFYiEdnD0lOo2spNqNr5u/Q7kWjXxmOp085SS6sqTdvUVDWTSeJhCSVNynZbnkv+xxNB+09tDLue21mk3bK/eW3GaUouMtqUc3dczQwmIpr3beBlu42ezTq1nZFO1ixNkyx4rF5FE1mxN75lnrNy1FRxzvJviYbdnzM1bNX5ehipe6+v36HqfPrCz0bU2ttUIrhkecsvGodXsSXP79SVZ6uAmAbRlsrCaBsjJgApCQ7gIBXADaUmKcswbItkGRsTYkAAY8VO0JdDKjT0rO0H98/kBScZUvOee5RXzOXjJdmJtKrdzfF/X6mjiXklw+bZuMXxmwu58rS+CudXV/H/AOHxCbdoyylyXczkYGVpLmrGevDJcVl5bhZsxuu3tuCr3SZuqZQdRdLOVLYm/ddk+Xcn99xdac7nlvVe6dzbW0zpKdKDcISm9ySXryPOscsVUnt1G83na72VySyPUXG5xcfoqbbdP9CWber/AD8uGG9x55jqc7dlyyvlstXv4mHReNqU6kY5tSf2yz43RuIs01FX77nNwWi/ZS2pZvn3dBG+bl47OtuziK3ZvyKJrBirtli0vjdmNiiY+ttSZ1wnb53LetJ0Xen4tejIYXdJcvmSw6/Zv+b5Ix4f3vP0O7yIWLbqJUzmvvcipo72p1W1Vril6/qSk9eiXFcVwMugbIXJNEWQSQgiMCNhgANthCsOKIsCYkNAUNM4es2I2YWW+z+/U7E5WVyna2YjsvPN/Dh6hK4GAd1LqvizFiFv6/Mlo19mfgRrvf1l6o2x9FHJpm7UefVXNCe5G05dqPR/MJFj1Gq9uUHul9/JnoFKpKnvzXHh1PM9V52rtLuSa/8AWfqet04KUVzR5eT9nu4r+LJRrp2NmVdJHEr4aUPcduXd+hzsVjqkd68mZlb1HWxteObyKdpjSCu7ENIaWlnlIreLqSnuy+LLErn6Yx93ZHCZv4ylZmglmd8Z08ud3W7Qyh98UYqL7SMsI9l+Hr+hipLtrqdHIJZtG5oWtsVoPi9nz3fFI1J5SFB2d+9O68Mwj1yhU2op8UTuc3QWI2qS6I6DZzdCYmFxSYVJARQXAlbmBDIYG3F5MUlmNA3mAxCbMNSVgMeJnd7K8eRRdcqvbUF3LPq3n8i7bShBzk+bZ5zp2rtVW33ljOXjHo1+90XqhVHfzl6/oQwk9lSfNfX5EFPcbYTnvX3uNmhnJcl6tmrDN+NvPM3aMbRlK2/d0FXGbdXVZOWIv4ffkevYB5I831IwDupNcz0nCKx5cruvbhNYs1alc5WNwuTO2auJjkZ01Komk8JyOfPA2W4tePoXZzsRSyLKtih6XwtkyvUl2i9aawvZZT/8O1Ld97ztx15eWMm6PX5ZmvR95dTcqR7P3vNamu/n8zq4VGus0Y6isZsUs/Ex1VuAu2qOIvTXk/8Aq7ejXkWWJQ9TsTabhxz81n6IvNJ5fDyMV0iZGSGyDIouJsQ2BG4AIDotCaMTqClWsrtpJc9wGeLszXx2Sb4ehz/9QYfa2PbU79cr9dxtYipeLzvl4MI5ukKu0knlFd35nu+GfiUDH1NurOXN28zvaRx0obSut1lxiyubVupuRjIpZZefUI33IlgsPOrLZhFylwSuXDQWoWJqtOUdlcW16IppwdH4Fytw3LjJ99up6LoLUWU6blVWztLKPBNZFq1c1MpYe0pLbmu9pWXRFrhTQ+O/W5148/1awGxHZatKLcZLg1vLF7Ox0sXomEpbcezPiv3v5l3mnUozh70briszz5cdj0TOVBGCsZ9pGKcTDccvEUrnLxFIsjw9zTrYN3sk30RNNbVXSOAbgysYrRt27Ln5JX+R6vHQc5LtdlZc35HB0ho2MIzSXutO77045q/Wx1wwycs88XlMtz+97/ua0dz6nR0lT2W1bvXp9WzQiuzfp8jtHky9LHRz8jXqPcbePXuvkaVTu++8qM+i8R7OrGXPPz+p6bhKqcU+Nn5o8nZmhiZrdOaXKckZsa3p6xKZgWIi9zXBc+nE84lpetsbHtJW5vN9XvNGVWbd9qV+O08unAfFdvWFITkeZ4PTNem+zUk1wk3JPz+RdtBaZjiIvLZnG21Hfv3NPvRLF26lxkQIumy7K7dss2+CPO9ZdOyrycItqknkk7bf8UuPQsGvWPcKcaUXZ1Pe/kW9eLt5FDsaxjNoRvYbSdWEdlTls8L7uho2C5pNM1SrfffzIOy4kdu27zIg07eqWl1hcVSrTinTUrVFa94Syk/DKX/U+l8MouMZQs4yScWrWaaumfJ7Z6l+FWvkaKjgsVO1O9qNVvKnf/jm+6N9z7r24FlI9kSJpCTHc00Ymh3FcDDVw8Xvin4Ff1sx1DBYepXnfJWjFSfbm8oxV+LO3pLHU6FOVWrOMIRV3JuyR89a/wCt8tIVuzeNCndU4vfLjUkuL+CMZSfw+Vj2PUbTdLH4ZVVHZqRezVp7TexLemv4Ws1+hZoxS3JI+adTdZ6mj8Qq0O1B9mrTvlVhf+pb0/qfRWiNKUcVSjXoTU4S4b4vvjJd0lwLjIW2tqosmVbTVC6nbn47r/AtEmcXGw/aLg7/AB/saqPEtZ6exUa5XX35HChUysXf8SMGoSTXdJp9He3oihxRzZy9b2NV4RfD6o5s2bsZ3ptcEaMtxQmAkAU2RYBcKVzras4v2eIhd5S7L8d3xscka++RFerWEUD/AFJifz/ACfE22tdcRt4mS7oRjHxtd+vwK+dDTlXaxFaX/wBJfB2+RoMrMIBAVQNAgAGMQA0vOpn4lYnBKNKovb0Fkoyl26S4Qm+7+F5dD1rQWv8Ao/FJKNeNOb/4637OSfBN9mXg2fNgDY+tJ4ukld1KaXF1IW87lV1g/EjR+FTSqqvU7oUe1n/FP3V5nzqBdix64a44jSE71HsUovsUot7MecvzS5lcEBDRnT0Fp/E4OftMPVlBv3lvhPlODyZywIaeuaK/GNWSxWGd/wA9GSz4twlu8GdLEfiVo6TjLbrK17p0J3zStuyPEiVy7qLhrnrVTxbapxmo7Sd5WV7bsiqIxMyIJU6M7NruZikrZDnvBu4EERJEQsDENiIoBgFgrr/5WBYf8FPgATan4t9ued+1LPjm8zAdDTuFVKvVgtyll0ea9TnFSGAAFCEAwpDEBAAAAAAAAAAADQgAkBELhEzJEwozRKlKoyCZOZFIIZiMzMLJWoAAAoM2CjepTXGcf6kYTf0DT2sRSX8V/wDym/kB6JcCNwMCj62/7ut1X9KOMAG4zDQABVDEAEAAAFAAAAAAAAAAAAAAAAAzLT7vvuACs05iEBERkQAA1DYkABQdXVj/AHEOkv6WAD6F/AAOav/Z" />
                <ProductBasic>
                    <H4>상품1</H4>
                    <Category>상의 > 티셔츠</Category>
                    <Price>￦1000</Price>
                </ProductBasic>
                <ProductOption>
                    <H5>옵션</H5>
                    <ProductOptionDiv>
                        <div>White</div>
                        <div>M</div>
                        <div>20</div>
                    </ProductOptionDiv>
                    <ProductOptionDiv>
                        <div>White</div>
                        <div>M</div>
                        <div>20</div>
                    </ProductOptionDiv>
                    <ProductOptionDiv>
                        <div>White</div>
                        <div>M</div>
                        <div>20</div>
                    </ProductOptionDiv>
                </ProductOption>
            </ProductInfo>
            <ButtonDiv>
                <EditButton>수정</EditButton>
                <DeleteButton>삭제</DeleteButton>
            </ButtonDiv>
        </ProductDiv>
    )
}

EditProduct.propTypes = {

}

export default EditProduct;
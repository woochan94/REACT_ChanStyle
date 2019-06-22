import React from "react"; 
import ProductPresenter from "./ProductPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEEITEM } from "./ProductQueries";

// react-router에서 match를 통해 url에 관한 정보(params, url ...)가 object로 넘어옴 
export default ({match}) => {
    const productId = match.params.productid;

    const { data, loading } = useQuery(SEEITEM, {
        variables: {
            id: productId
        }
    }); 

    // TODO : Color도 같이 묶어줘야함 
    // size와 재고량을 같이 묶어주기 위한 배열객체 
    let option = [];

    if(loading === false) {
        data.seeproduct.map((item) => (
            item.sizes.map((_, index) => (
                option.push(
                    {
                        sizes: item.sizes[index].size, 
                        stocks: item.stocks[index].stock,
                        sizeId: item.sizes[index].id,
                        stockId: item.stocks[index].stock
                    }
                )
            )) 
        ))
    }

    return (
        <ProductPresenter 
            data={data.seeproduct}
            loading={loading}
            option={option}
        />
    );
};
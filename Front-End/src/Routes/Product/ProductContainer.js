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
    
    return (
        <ProductPresenter 
            data={data.seeproduct}
            loading={loading}
        />
    );
};
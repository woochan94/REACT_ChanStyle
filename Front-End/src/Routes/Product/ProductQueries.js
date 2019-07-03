import { gql } from "apollo-boost"; 

export const SEEITEM = gql`
    query seeproduct($id: String!) {
        seeproduct(id: $id) {
            id
            name
            price
            mainCategory
            subCategory
            files {
                id
                url
            }
            colors {
                id
                color
            }
            sizes {
                id
                size
            }
            stocks {
                id
                stock
            }
            productDetailFile {
                id 
                productDetailFile
            }
            productSizeFile {
                id
                productSizeFile
            }
        }
    }
`;

export const ADD_CART = gql`
    mutation addCart($product: [String!]!, $sizeId: [String!]!, $colorId: [String!]!, $stockId: [String!]!) {
        addCart(product: $product, sizeId: $sizeId, colorId: $colorId, stockId: $stockId)
    }
`
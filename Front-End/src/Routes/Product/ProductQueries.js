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
    mutation addCart($product: [String!]!, $sizeId: [String!]!, $colorId: [String!]!, $stockId: [String!]!, $count: [Int!]!) {
        addCart(product: $product, sizeId: $sizeId, colorId: $colorId, stockId: $stockId, count: $count)
    }
`

export const ADD_PAYMENT = gql`
    mutation addPayment($product: [String!]!, $size: [String!]!, $color: [String!]!, $stock: [String!]!, $count: [Int!]!, $cart: [String!]) {
        addPayment(product: $product, size: $size, color: $color, stock: $stock, count: $count, cart: $cart)
    }
`;
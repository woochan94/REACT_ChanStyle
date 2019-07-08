import { gql } from "apollo-boost"; 

export const SEE_PAYMENT = gql`
    {
        seePayment {
            id
            product {
                id 
                name
                price
                numberOfSales
                files {
                    id 
                    url
                }
            }
            size {
                id 
                size 
            }
            color {
                id 
                color 
            }
            stock {
                id 
                stock 
            }
            count {
                id 
                count
            }
            cart {
                id 
            }
        }
    }
`; 

export const EDIT_STOCK = gql`
    mutation editStock($id: [String!]!, $stock: [Int!]!) {
        editStock(id: $id, stock: $stock)
    }
`; 

export const EDIT_NUMBEROFSALES = gql`
    mutation editNumberOfSales($id: [String!]!, $saleCount: [Int!]!) {
        editNumberOfSales(id: $id, saleCount: $saleCount) 
    }
`

export const ADD_BUYLIST = gql`
    mutation addBuyList($product: [String!]!, $size: [String!]!, $color: [String!]!, $quantity: [Int!]!) {
        addBuyList(product: $product, size: $size, color: $color, quantity: $quantity)
    }
`; 
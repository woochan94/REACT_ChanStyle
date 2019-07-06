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
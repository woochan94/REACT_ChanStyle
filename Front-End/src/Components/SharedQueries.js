import { gql } from "apollo-boost"; 

export const QUERY = gql`
  {
    isLoggedIn @client 
  }
`; 

export const ME = gql`
    {
        me {
            id
            name
            email 
            zipCode 
            address 
            addressDetail 
            phone 
        }
    }
`;

export const MEMUTATION = gql`
    mutation me {
        me {
            id
            name
            email 
            zipCode 
            address 
            addressDetail 
            phone 
        }
    }
`;

export const DELETE_PAYMENT = gql`
    mutation deletePayment($id: [String!]!) {
        deletePayment(id: $id)
    }
`; 

export const SEE_PAYMENT2 = gql`
    mutation seePayment {
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
`
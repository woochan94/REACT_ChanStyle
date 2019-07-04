import { gql } from "apollo-boost"; 

export const SEE_PAYMENT = gql`
    {
        seePayment {
            id
            product {
                id 
                name
                price
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
import { gql } from "apollo-boost"; 

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

export const DELETE_PAYMENT = gql`
    mutation deletePayment($id: [String!]!) {
        deletePayment(id: $id)
    }
`; 
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
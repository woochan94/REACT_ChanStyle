import { gql } from "apollo-boost"; 

export const MAIN_SEEITEM = gql`
    query seeproduct($sort: String!) {
        seeproduct(sort: $sort) {
            id
            name
            price 
            files {
                id 
                url
            }
        }
    }
`;
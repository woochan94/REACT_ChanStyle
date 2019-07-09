import { gql } from "apollo-boost"; 

export const SEE_ALL_BESTITEM = gql`
    mutation seeProductBest($sort: String!, $mainCategory: String, $subCategory: String) {
        seeProductBest(sort: $sort, mainCategory: $mainCategory, subCategory: $subCategory) {
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

export const SEE_PRODUCT = gql`
    mutation seeProductAll($id: String, $sort: String!, $mainCategory: String, $subCategory: String, $first: Int, $skip: Int) {
        seeProductAll(id:$id, sort:$sort, mainCategory:$mainCategory, subCategory:$subCategory, first:$first, skip:$skip) {
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
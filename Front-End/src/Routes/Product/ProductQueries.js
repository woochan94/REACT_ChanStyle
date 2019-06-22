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
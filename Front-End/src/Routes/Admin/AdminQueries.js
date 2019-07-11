import { gql } from "apollo-boost"; 

export const UPLOAD = gql`
    mutation upload(
        $name: String!, 
        $price: Int!, 
        $mainCategory: String!,
        $subCategory: String!, 
        $files: [String!]!, 
        $sizes: [String!]!, 
        $colors: [String!]!, 
        $stocks: [Int!]!,
        $productDetailFiles: [String!], 
        $productSizeFiles: [String!]) {
            upload(
                name: $name, 
                price: $price, 
                mainCategory: $mainCategory, 
                subCategory: $subCategory, 
                files: $files, 
                sizes: $sizes, 
                colors: $colors, 
                stocks: $stocks,
                productDetailFiles: $productDetailFiles, 
                productSizeFiles: $productSizeFiles
            ) {
                id
            }
        }
`; 
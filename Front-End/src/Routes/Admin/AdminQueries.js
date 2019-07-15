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

export const EDIT_SEE_PRODUCT = gql`
        mutation seeProductAll($id: String, $sort: String!, $first: Int, $skip: Int) {
        seeProductAll(id:$id, sort:$sort, first:$first, skip:$skip) {
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
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: String!) {
        deleteProduct(id:$id)
    }
`;

export const EDIT_PRODUCT = gql`
    mutation editProduct(
        $id: String!, 
        $name: String, 
        $price: Int, 
        $mainCategory: String, 
        $subCategory: String, 
        $fileId:String, 
        $file: [String],
        $sizeId: [String],
        $sizeValue: [String],
        $colorId: [String], 
        $colorValue: [String], 
        $stockId: [String], 
        $stockValue: [Int],
        $productId: String) 
        {
        editProduct(id:$id, name:$name, price:$price, mainCategory:$mainCategory, subCategory:$subCategory) {
            id,
            name,
            price
        },
        editFile(fileId:$fileId, file:$file),
        editSize(productId:$productId, sizeId:$sizeId, sizeValue:$sizeValue),
        editColor(productId:$productId, colorId:$colorId, colorValue:$colorValue),
        editStock(productId:$productId, stockId:$stockId, stockValue:$stockValue),
    }
`;
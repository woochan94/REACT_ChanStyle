import { gql } from "apollo-boost";

export const EDIT_PROFILE = gql`
    mutation editUser(
        $name: String, 
        $zipCode: String, 
        $address: String, 
        $addressDetail: String, 
        $phone: String, 
        $password: String, 
        $confirmPassword: String
    ) {
        editUser(
            name: $name, 
            zipCode: $zipCode, 
            address: $address, 
            addressDetail:$addressDetail, 
            phone:$phone,
            password: $password,
            confirmPassword: $confirmPassword
        ) 
    }
`;

export const SEE_CART = gql`
    {
        seeCart {
            id
            product {
                files {
                    url
                }
                id
                name
                price
            }
            sizeId {
                id 
                size 
            }
            colorId {
                id 
                color 
            }
            stockId {
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

export const DELETE_CART = gql`
    mutation deleteCart($id: [String!]!) {
        deleteCart(id:$id)
    }
`;

export const SEE_BUYLIST = gql`
    mutation seeBuyList2($first:Int $skip:Int) {
        seeBuyList2(first: $first, skip: $skip) {
            id
            product {
                id
                name 
                price 
            }
            size {
                id 
                size 
            }
            color {
                id 
                color 
            }
            quantity {
                id 
                quantity
            }
        }
    }
`; 

export const BUYLIST_QUERY = gql`
    {
        seeBuyList {
            id
        }
    }
`;

export const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;
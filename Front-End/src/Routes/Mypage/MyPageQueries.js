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
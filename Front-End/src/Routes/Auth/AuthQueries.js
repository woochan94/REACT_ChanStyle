import { gql } from "apollo-boost"; 

export const LOG_IN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount(
        $name: String!, 
        $email: String!,
        $password: String!, 
        $zipCode: String!, 
        $address: String!, 
        $addressDetail: String!, 
        $phone: String! 
    ) {
        createAccount(
            name: $name, 
            email: $email, 
            password: $password, 
            zipCode: $zipCode, 
            address: $address,
            addressDetail: $addressDetail, 
            phone: $phone
        )
    }
`;

// LocalState에 작성한 Local용 mutation을 통해 token을 생성하는 query문 
export const LOCAL_LOG_IN = gql`
    mutation logUserIn($token: String!) {
        logUserIn(token: $token) @client
    }
`;
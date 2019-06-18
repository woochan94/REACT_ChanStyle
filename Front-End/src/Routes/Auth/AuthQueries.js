import { gql } from "apollo-boost"; 

export const LOG_IN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

// LocalState에 작성한 Local용 mutation을 통해 token을 생성하는 query문 
export const LOCAL_LOG_IN = gql`
    mutation logUserIn($token: String!) {
        logUserIn(token: $token) @client
    }
`;
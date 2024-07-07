import { gql, useMutation } from "@apollo/client";

const MUTATION_USER_CREATE = gql`
  mutation userMutation($user: UserInput!) {
    createUser(user: $user) {
      first_name
    }
  }
`;
const MUTATION_USER_SIGN_IN = gql`
  mutation signIn($emailAddress: String, $password: String) {
    signIn(email_address: $emailAddress, password: $password) {
      code
      message
    }
  }
`;
/*
const QUERY_USER = gql`
  query User($emailAddress: String, $password: String) {
    signIn(email_address: $emailAddress, password: $password) {
      code
      message
    }
  }
`;
*/
export { MUTATION_USER_CREATE, MUTATION_USER_SIGN_IN };

import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation userMutation($user: UserInput!) {
    createUser(user: $user) {
      first_name
    }
  }
`;
const QUERY_USER = gql`
  query User($emailAddress: String, $password: String) {
    signIn(email_address: $emailAddress, password: $password) {
      code
      message
    }
  }
`;

export { CREATE_USER, QUERY_USER };

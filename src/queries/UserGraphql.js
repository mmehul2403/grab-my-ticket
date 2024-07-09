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
const MUTATION_USER_SIGN_OUT = gql`
  mutation signOut {
    signOut {
      code
      message
    }
  }
`;

const QUERY_USER_CURRENT = gql`
  query user {
    currentUser {
      user_id
      first_name
      last_name
      date_of_birth
      register_date
      role
    }
  }
`;

export { MUTATION_USER_CREATE, MUTATION_USER_SIGN_IN, QUERY_USER_CURRENT, MUTATION_USER_SIGN_OUT };

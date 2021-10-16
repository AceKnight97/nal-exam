import gql from 'graphql-tag';
import { USER } from '../fragments/user';

const ROOT_SIGN_IN = gql`
  mutation rootSignIn($email: EmailAddress!, $password: String!) {
    rootSignIn(email: $email, password: $password) {
      isSuccess
      message
      accessToken
      accessToken
      me {
        ...${USER}
      }
    }
  }
`;

export default ROOT_SIGN_IN;

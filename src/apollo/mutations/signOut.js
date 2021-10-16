import gql from 'graphql-tag';

const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      isSuccess
      message
    }
  }
`;

export default SIGN_OUT;

import gql from 'graphql-tag';
import { USER } from '../fragments/user';

const ME = gql`
  query me {
    me {
      ...${USER}
    }
  }
`;

export default ME;

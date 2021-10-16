import gql from 'graphql-tag';

export const TEMP = '';

export const USER = gql`
{
  id
  firstName
  lastName
  email
  role
  status
  city
  country
  address
  zip
  company {
    id
    name
  }
}
`;

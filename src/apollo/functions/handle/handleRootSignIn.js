import { client } from '../../apolloClient';
import ROOT_SIGN_IN from '../../mutations/rootSignIn';

const handleRootSignIn = async (variables) => {
  try {
    const result = await client.mutate({
      mutation: ROOT_SIGN_IN,
      variables,
    });
    const { rootSignIn } = result?.data;
    return rootSignIn;
  } catch (error) {
    throw error;
  }
};

export default handleRootSignIn;

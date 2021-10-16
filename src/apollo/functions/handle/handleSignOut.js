import createClient from '../../apolloClient';
import SIGN_OUT from '../../mutations/signOut';

const handleSignOut = async (variables) => {
  const client = await createClient();
  try {
    const result = await client.mutate({
      mutation: SIGN_OUT,
      variables,
    });
    const { signOut } = result?.data;
    if (!signOut?.isSuccess) {
      throw signOut.message;
    }
  } catch (error) {
    throw error;
  }
};

export default handleSignOut;

import createClient from '../../apolloClient';
import ME from '../../queries/me';

const fetchMe = async (variables) => {
  try {
    const client = await createClient();
    const result = await client.query({
      query: ME,
      variables,
    });
    const { me } = result?.data || {};
    return me;
  } catch (error) {
    throw error;
  }
};

export default fetchMe;

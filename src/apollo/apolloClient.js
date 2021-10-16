import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import packageJson from '../../package.json';
import CONFIG from '../constants/config';
import auth from '../utils/auth';

// import CONFIG from '../Config';
// import EMITTER_CONSTANTS from '../Constants/';
// import emitter from '../Utils/eventEmitter';

const cache = new InMemoryCache({ addTypename: false });

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const createClient = async (isUsingCache = false, isNotShowDisconnect = false) => {
  try {
    const token = auth.getToken();
    // console.log({ token });
    // const currentSession = await Auth.currentSession();
    // const token = currentSession.accessToken.jwtToken;
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '',
        'access-token': token,
        // token,
      },
    }));
    return new ApolloClient({
      link: authLink.concat(
        ApolloLink.from([
          onError(({
            graphQLErrors, networkError, response, operation, forward,
          }) => {
            if (graphQLErrors) {
              // _.map(graphQLErrors, ({ message, extensions }) => {
              //   if (_.includes(message, '403') || _.includes(message, '400') || extensions.code === 'UNAUTHENTICATED') {
              //     emitter.emit(EMITTER_CONSTANTS.LOGOUT);
              //   }
              // });
            } else if (networkError) {
              console.error(`[Network error]: ${networkError}`);
              // if (!isNotShowDisconnect) {
              // openPopupDisconnect();
              // }
              throw networkError;
            }
          }),
          new HttpLink({
            uri: CONFIG.APOLLO_HOST_URL,
            credentials: 'same-origin',
          }),
        ]),
      ),
      cache,
      defaultOptions: isUsingCache ? undefined : defaultOptions,
      name: 'web',
      version: packageJson.version,
    });
  } catch (error) {
    throw error;
  }
};

export const client = new ApolloClient({
  link: new HttpLink({
    uri: CONFIG.APOLLO_HOST_URL,
    credentials: 'same-origin',
  }),
  cache,
  defaultOptions,
});

export default createClient;

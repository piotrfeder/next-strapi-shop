import { ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {parseCookies} from 'nookies';
const cookies = parseCookies();

const httpLink = createHttpLink({
    uri: 'http://localhost:1337/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = cookies.jwt;
    console.log('cookies',token )
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
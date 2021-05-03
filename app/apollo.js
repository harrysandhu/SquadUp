import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';

// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = 'https://truffen.com/squadup/graphql';

/*
uncomment the code below in case you are using a GraphQL API that requires some form of
authentication. asyncAuthLink will run every time your request is made and use the token
you provide while making the request.




*/

// const TOKEN = '';
const API_TOKEN = "squadup69"
const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      // Authorization: TOKEN,
      "x-api-key": API_TOKEN
    },
  };
});


const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  link: asyncAuthLink.concat(httpLink),
});

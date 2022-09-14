// let's first import the symbols we need from
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

// Next we'll initialize ApolloClient, passing
// its constructor a configuration object with the uri and cache fields:
const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export default client;

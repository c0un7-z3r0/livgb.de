import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import introspectionResult from "./__generated__/fragment-matcher";

const client = new ApolloClient({
  uri: `${import.meta.env.STRAPI_URL}/graphql`,
  ssrMode: true,
  cache: new InMemoryCache({
    possibleTypes: introspectionResult.possibleTypes,
    addTypename: true,
  }),
  headers: {
    Authorization: `Bearer ${import.meta.env.STRAPI_KEY}`,
  },
});

export default client;

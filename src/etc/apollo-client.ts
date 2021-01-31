import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://olivier-desforges.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

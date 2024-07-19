import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include", // This sends cookies with requests
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

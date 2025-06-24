"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

function makeClient() {
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === "production"
        ? `https://${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/api`
        : "http://localhost:4000/api",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

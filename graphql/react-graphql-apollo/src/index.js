import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import registerServiceWorker from './registerServiceWorker';
import { App } from './App';

import './style.css';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL, headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      }`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
});

const link = ApolloLink.from([errorLink, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();

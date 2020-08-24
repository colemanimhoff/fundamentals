import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { ErrorMessage } from '../Error/index.js';
import { Loading } from '../Loading/index.js';
import { RepositoryList, REPOSITORY_FRAGMENT } from '../Repository/index.js';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

export const Organization = ({ organizationName }) => (
  <Query
    notifyOnNetworkStatusChange={true}
    query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{
      organizationName
    }}
    skip={organizationName === ''}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (loading && !data) {
        return <Loading />;
      }
      const { organization } = data;

      return (
        <RepositoryList
          entry={'organization'}
          fetchMore={fetchMore}
          loading={loading}
          repositories={organization.repositories}
        />
      );
    }}
  </Query>
);
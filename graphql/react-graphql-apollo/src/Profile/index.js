import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { ErrorMessage } from '../Error';
import { Loading } from '../Loading';
import { RepositoryList } from '../Repository/index';
import { REPOSITORY_FRAGMENT } from '../Repository/index.js';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
query ($cursor: String) {
  viewer {
    repositories(
      first: 5
      orderBy: { direction: DESC, field: STARGAZERS }
      after: $cursor
    ) {
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
${REPOSITORY_FRAGMENT}`;

export const Profile = () => (
  <Query
    notifyOnNetworkStatusChange={true}
    query={GET_REPOSITORIES_OF_CURRENT_USER}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (loading && !data) {
        return <Loading />;
      }
      const { viewer } = data;
      return <RepositoryList
        loading={loading}
        fetchMore={fetchMore}
        repositories={viewer.repositories}
      />;
    }}
  </Query>
);
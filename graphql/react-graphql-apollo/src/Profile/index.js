import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { ErrorMessage } from '../Error';
import { Loading } from '../Loading';
import { RepositoryList } from '../Repository/index';
import { REPOSITORY_FRAGMENT } from '../Repository/index.js';

const GET_CURRENT_USER = gql`
{
  viewer {
    repositories(
      first: 5
      orderBy: { direction: DESC, field: STARGAZERS }
    ){
      edges {
        node {
          ...repository
        }
      }
    }
  }      
}
${REPOSITORY_FRAGMENT}`;

export const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (loading) {
        return <Loading />;
      }
      const { viewer } = data;
      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);
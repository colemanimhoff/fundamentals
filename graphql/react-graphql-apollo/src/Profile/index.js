import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { RepositoryList } from '../Repository/index';
import { Loading } from '../Loading';

export const GET_CURRENT_USER = gql` {
  viewer {
    repositories(
      first: 5
      orderBy: { direction: DESC, field: STARGAZERS }
    ){
      edges {
        node {
          id
          name
          url
          descriptionHTML
          primaryLanguage {
            name
          }
          owner {
            login
            url
          }
          stargazers {
            totalCount
          }
          viewerHasStarred
          watchers {
            totalCount
          }
            viewerSubscription
        }
      }
    }
  }      
} `;

export const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) {
        return <Loading />;
      };
      const { viewer } = data;
      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);
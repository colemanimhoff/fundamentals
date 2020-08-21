import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
export const GET_CURRENT_USER = gql` {
    viewer {
      login
name }
} `;

export const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {() => <div>My Profile</div>}
  </Query>
);
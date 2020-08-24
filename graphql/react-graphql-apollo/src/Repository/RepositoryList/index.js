import React, { Fragment } from 'react';

import { FetchMore } from '../../FetchMore/index.js';
import { RepositoryItem } from '../RepositoryItem/index.js';

import '../style.css';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,],
      }
    }
  };
};

export const RepositoryList = ({ repositories, fetchMore, loading }) => {
  return <Fragment>
    {repositories.edges.map(({ node }) => {
      return (
        <div key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />
        </div>
      );
    })}
    <FetchMore
      loading={loading} hasNextPage={repositories.pageInfo.hasNextPage} variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={updateQuery}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </Fragment>;
};
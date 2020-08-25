import React, { Fragment } from 'react';

import Issues from '../../Issue/index.js';
import { FetchMore } from '../../FetchMore/index.js';
import { RepositoryItem } from '../RepositoryItem/index.js';

import '../style.css';

const updateQuery = (entry) => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges
        ]
      }
    }
  };
};

export const RepositoryList = ({ repositories, fetchMore, loading, entry }) => {
  return <Fragment>
    {repositories.edges.map(({ node }) => {
      return (
        <div key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />
          <Issues
            repositoryName={node.name}
            repositoryOwner={node.owner.login}
          />
        </div>
      );
    })}
    <FetchMore
      loading={loading} hasNextPage={repositories.pageInfo.hasNextPage} variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={updateQuery(entry)}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </Fragment>;
};
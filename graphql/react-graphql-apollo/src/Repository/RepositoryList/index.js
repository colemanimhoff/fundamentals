import React from 'react';

import { RepositoryItem } from '../RepositoryItem';
import '../style.css';

export const RepositoryList = ({ repositories }) => {
  return <>
    {repositories.edges.map(({ node }) => {
      return (
        <div key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />
        </div>
      );
    })}
  </>
};
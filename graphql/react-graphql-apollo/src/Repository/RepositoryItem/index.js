import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { Button } from '../../Button/index.js';
import { Link } from '../../Link/index.js';
import '../style.css';
import { REPOSITORY_FRAGMENT } from '../fragments.js';

const STAR_REPOSITORY = gql`
mutation($id: ID!) {
  addStar(input: { starrableId: $id }) {
    starrable {
      id
      viewerHasStarred
    }
  }
}`;

const UNSTAR_REPOSITORY = gql`
mutation($id: ID!) {
  removeStar(input: { starrableId: $id }) {
    starrable {
      id
      viewerHasStarred
    }
  }
}`;

const updateAddStar = (
  client,
  { data: { addStar: { starrable: { id } } } }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  });
  const totalCount = repository.stargazers.totalCount + 1;
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount
      }
    }
  });
};

const updateRemoveStar = (
  client,
  { data: { removeStar: { starrable: { id } } } }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  });
  const totalCount = repository.stargazers.totalCount - 1;
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount
      }
    }
  });
};

export const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
    <div>
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}>{name}</Link>
        </h2>
        <div className="RepositoryItem-title-action">
          {!viewerHasStarred ? (
            <Mutation
              mutation={STAR_REPOSITORY}
              update={updateAddStar}
              variables={{ id }}
            >
              {(addStar, { data, loading, error }) => (
                <Button
                  className={'RepositoryItem-title-action'}
                  onClick={addStar}
                >
                  {stargazers.totalCount} Star
                </Button>
              )}
            </Mutation>
          ) : (
              <Mutation
                mutation={UNSTAR_REPOSITORY}
                update={updateRemoveStar}
                variables={{ id }}
              >
                {(addStar, { data, loading, error }) => (
                  <Button
                    className={'RepositoryItem-title-action'}
                    onClick={addStar}
                  >
                    {stargazers.totalCount} Unstar
                  </Button>
                )}
              </Mutation>
            )}
          {/* {updateSubscription mutation} */}
        </div>
      </div>
      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && (
              <span>Language: {primaryLanguage.name}</span>
            )}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div >
  );
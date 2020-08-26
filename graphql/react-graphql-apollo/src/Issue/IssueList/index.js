import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer, Query } from 'react-apollo';
import { withState } from 'recompose';


import { ButtonUnobtrusive } from '../../Button/index.js';
import { ErrorMessage } from '../../Error/index.js';
import { IssueItem } from '../IssueItem/index.js';
import { Loading } from '../../Loading/index.js';

import './style.css';

const ISSUE_STATES = {
  NONE: 'NONE',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
};

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: 'Show Open Issues',
  [ISSUE_STATES.OPEN]: 'Show Closed Issues',
  [ISSUE_STATES.CLOSED]: 'Hide Issues',
};

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE
};

const GET_ISSUES_OF_REPOSITORY = gql`
  query(
    $repositoryOwner: String!,
    $repositoryName: String!,
    $issueState: IssueState!
    ) {
      repository(name: $repositoryName, owner: $repositoryOwner) {
        issues(first: 5, states: [$issueState]) {
          edges {
            node {
              id
              number
              state
              title
              url
              bodyHTML
            }
          }
        }
      }
  }
`;

const isShow = (issueState) => issueState !== ISSUE_STATES.NONE;

const prefetchIssues = (
  client,
  issueState,
  repositoryName,
  repositoryOwner
) => {
  const nextIssueState = TRANSITION_STATE[issueState];
  if (isShow(nextIssueState)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryOwner,
        repositoryName,
        issueState: nextIssueState
      }
    });
  }
};

const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem
        key={node.id}
        issue={node}
      />
    ))}
  </div>
);

const IssueFilter = ({
  issueState,
  onChangeIssueState,
  repositoryOwner,
  repositoryName
}) => {
  return (
    <ApolloConsumer>
      {(client) => (
        <ButtonUnobtrusive
          onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
          onMouseOver={() =>
            prefetchIssues(
              client,
              issueState,
              repositoryName,
              repositoryOwner
            )}
        >
          {TRANSITION_LABELS[issueState]}
        </ButtonUnobtrusive>
      )}
    </ApolloConsumer>
  );
};

const Issues = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState
}) => {
  return (
    <div className="Issues">
      <IssueFilter
        issueState={issueState}
        onChangeIssueState={onChangeIssueState}
        repositoryName={repositoryName}
        repositoryOwner={repositoryOwner}
      />
      {isShow(issueState) && (
        <Query
          query={GET_ISSUES_OF_REPOSITORY}
          variables={{
            repositoryOwner,
            repositoryName,
            issueState,
          }}
        >
          {({ data, loading, error }) => {
            if (error) {
              return <ErrorMessage error={error} />;
            }

            if (loading && !data) {
              return <Loading />;
            }
            const { repository } = data;

            const filteredRepository = {
              issues: {
                edges: repository.issues.edges.filter(issue => issue.node.state === issueState),
              },
            };
            if (!repository.issues.edges.length) {
              return <div className="IssueList">No issues...</div>;
            }
            return <IssueList issues={filteredRepository.issues} />;
          }}
        </Query>
      )}
    </div>
  );
};

export default withState(
  'issueState',
  'onChangeIssueState',
  ISSUE_STATES.NONE,
)(Issues);
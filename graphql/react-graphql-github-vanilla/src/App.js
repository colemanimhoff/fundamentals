import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Form, Button } from 'react-bootstrap';
import { Organization } from './components/Organization';

const App = () => {
  const [state, setState] = useState({
    errors: null,
    path: '',
    organization: null
  });
  const TITLE = 'React GraphQL Github Client';
  const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
  });
  const GET_ISSUES_OF_REPOSITORY = `
    query ($organization: String!, $repository: String!, $cursor: String) {
      organization(login: $organization) {
        name
        url
        repository(name: $repository) {
          name
          url
          issues(first: 5, after: $cursor, states: [OPEN]) {
            edges {
              node {
                id
                title
                url
                reactions(last: 3) {
                  edges {
                    node {
                      id
                      content
                    }
                  }
                }
              }
            }
            totalCount
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `;
  const resolveIssuesQuery = (queryResult, cursor) => (state) => {
    const { data, errors } = queryResult.data;

    if (!cursor) {
      return {
        ...state,
        organization: data.organization,
        errors
      };
    }

    const { edges: oldIssues } = state.organization.repository.issues;
    const { edges: newIssues } = data.organization.repository.issues;
    const updatedIssues = [...oldIssues, ...newIssues];

    return {
      ...state,
      organization: {
        ...data.organization,
        repository: {
          ...data.organization.repository,
          issues: {
            ...data.organization.repository.issues,
            edges: updatedIssues
          }
        }
      },
      errors
    };
  };
  const getIssuesOfRepository = (path, cursor) => {
    const [organization, repository] = path.split('/');
    return axiosGitHubGraphQL.post('', {
      query: GET_ISSUES_OF_REPOSITORY,
      variables: { organization, repository, cursor }
    });
  };
  const onFetchFromGitHub = async (path, cursor) => {
    const result = await getIssuesOfRepository(path, cursor);
    setState(resolveIssuesQuery(result, cursor));
  };

  const onFetchMoreIssues = () => {
    const { endCursor } = state.organization.repository.issues.pageInfo;
    onFetchFromGitHub(state.path, endCursor);
  };

  const handleOnChange = (e) => {
    setState({
      ...state,
      path: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onFetchFromGitHub(state.path);
  };

  return (
    <div className="app">
      <h1>{TITLE}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="url">
            {'Show open issues for https://github.com/' + state.path}
          </Form.Label>
          <Form.Control
            id="url"
            onChange={handleOnChange}
            placeholder="Enter organization and repo path..."
            type="text"
            value={state.path}
          />
        </Form.Group>
        <Button type="submit">
          Search
        </Button>
      </Form>
      <div>
        {state.organization || state.errors
          ? <Organization
            onFetchMoreIssues={onFetchMoreIssues}
            organization={state.organization}
            errors={state.errors}
          />
          : <p>No information yet...</p>}
      </div>
    </div>
  );
};

export default App;

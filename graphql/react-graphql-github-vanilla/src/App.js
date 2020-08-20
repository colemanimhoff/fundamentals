import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ADD_STAR, GET_ISSUES_OF_REPOSITORY, REMOVE_STAR } from './graphQL';
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
  const resolveAddStarMutation = (mutationResult) => (state) => {
    const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;
    const { totalCount } = state.organization.repository.stargazers;

    return {
      ...state,
      organization: {
        ...state.organization,
        repository: {
          ...state.organization.repository,
          viewerHasStarred,
          stargazers: {
            totalCount: totalCount + 1
          }
        }
      }
    }
  };
  const resolveRemoveStarMutation = (mutationResult) => (state) => {
    const { viewerHasStarred } = mutationResult.data.data.removeStar.starrable;
    const { totalCount } = state.organization.repository.stargazers;
  
    return {
      ...state,
      organization: {
        ...state.organization,
        repository: {
          ...state.organization.repository,
          viewerHasStarred,
          stargazers: {
            totalCount: totalCount - 1,
          }
        }
      }
    };
  };
  const addStarToRepository = (repositoryId) => {
    return axiosGitHubGraphQL.post('', {
      query: ADD_STAR,
      variables: { repositoryId }
    })
  };
  const removeStarFromRepository = (repositoryId) => {
    return axiosGitHubGraphQL.post('', {
      query: REMOVE_STAR,
      variables: { repositoryId },
    });
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
  const onStarRepository = async (repositoryId, viewerHasStarred) => {
    let result;
    if (viewerHasStarred) {
      result = await removeStarFromRepository(repositoryId);
      setState(resolveRemoveStarMutation(result));
    } else {
      result = await addStarToRepository(repositoryId);
      setState(resolveAddStarMutation(result));
    }
  };

  const handleOnChange = (e) => {
    setState({
      ...state,
      path: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.path.trim() === '') {
      return;
    }
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
            errors={state.errors}
            onFetchMoreIssues={onFetchMoreIssues}
            organization={state.organization}
            onStarRepository={onStarRepository}
          />
          : <p>No information yet...</p>}
      </div>
    </div>
  );
};

export default App;

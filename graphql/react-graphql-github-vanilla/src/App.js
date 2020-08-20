import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Form, Button } from 'react-bootstrap';
import { Organization } from './components/Organization';

const App = () => {
  const [errors, setErrors] = useState(null);
  const [path, setPath] = useState('');
  const [organization, setOrganization] = useState(null);
  const TITLE = 'React GraphQL Github Client';
  const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
  });
  const GET_ISSUES_OF_REPOSITORY = `
    query ($organization: String!, $repository: String!) {
      organization(login: $organization) {
        name
        url
        repository(name: $repository) {
          name
          url
          issues(last: 5) {
            edges {
              node {
                id
                title
                url
              }
            }
          }
        }
      }
    }
`;
  const fetchOrganization = async () => {
    const [organization, repository] = path.split('/');
    const result = await axiosGitHubGraphQL
      .post('', {
        query: GET_ISSUES_OF_REPOSITORY,
        variables: { organization, repository }
      });

    if (result.data.errors) {
      setErrors(result.data.errors);
    } else {
      setOrganization(result.data.data.organization);
    }
  };

  const handleOnChange = (e) => {
    setPath(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrganization();
    setPath('');
  };

  return (
    <div className="app">
      <h1>{TITLE}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="url">
            {'Show open issues for https://github.com/' + path}
          </Form.Label>
          <Form.Control
            id="url"
            onChange={handleOnChange}
            placeholder="Enter organization and repo path..."
            type="text"
            value={path}
          />
        </Form.Group>
        <Button type="submit">
          Search
        </Button>
      </Form>
      <div>
        {
          organization || errors
            ? <Organization
              organization={organization}
              errors={errors}
            />
            : <p>No information yet...</p>
        }
      </div>
    </div>
  );
};

export default App;

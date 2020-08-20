import ApolloClient, { gql } from 'apollo-boost';
import 'cross-fetch/polyfill';
import 'dotenv/config';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    });
  }
});

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
    query($organization: String!) {
      organization(login: $organization) {
        name
        url
        repositories(first: 5) {
          edges {
            node {
              name
              url
              stargazers {
                totalCount
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
`;

const ADD_STAR = gql`
    mutation AddStar($repositoryId: ID!) {
      addStar(input: { starrableId: $repositoryId }) {
        starrable {
          id
          viewerHasStarred
        }
      }
    }
`;

const REMOVE_STAR = gql`
    mutation RemoveStar($repositoryId: ID!) {
      removeStar(input: { starrableId: $repositoryId }) {
        starrable {
          id
          viewerHasStarred
        }
      }
    }
`;

client.query({
  query: GET_REPOSITORIES_OF_ORGANIZATION,
  variables: { organization: 'the-road-to-learn-react' }
})
  .then(result => {
    console.log(`
    Organization: ${result.data.organization.name}
    Url: ${result.data.organization.url}
    Repositories: ${result.data.organization.repositories.edges.map(edge => {
      return ' name: ' + edge.node.name + ' starCount: ' + edge.node.stargazers.totalCount;
    })}
    `);
  });

client.mutate({
  mutation: ADD_STAR,
  variables: {
    repositoryId: 'MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=='
  }
})
  .then(result => {
    console.log(`
      viewerHasStarred: ${result.data.addStar.starrable.viewerHasStarred}
    `);
  });

setTimeout(() => {
  client.mutate({
    mutation: REMOVE_STAR,
    variables: {
      repositoryId: 'MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=='
    }
  })
    .then(result => {
      console.log(`
          viewerHasStarred: ${result.data.removeStar.starrable.viewerHasStarred}
        `);
    });
}, 1000);


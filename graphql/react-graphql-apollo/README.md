# React GraphQL GitHub Apollo

A react app using GraphQL, Apollo, and the GitHub GraphQL API

## Error Handling

Links can be used to access and modify the GraphQL control flow. When doing so, be careful to chain the control flow in the correct order.

### Terminating Link

The `apollo-link-http` is called a `terminating link` because it turns an operation into a result that usually occurs from a network request.

### Non-Terminating Link

On the other side, the `apollo-link-error` is a `non-terminating-link`. It only enhances your terminating link with features, since a terminating link has to be the last entity in the control flow chain.

## Queries and Mutations

`react-apollo` give us a `Query` and `Mutation` components that implement the `render-props` pattern (`children` and a `function`).

The `Query` component uses this pattern to access the `result` of the query. The `Mutation` component uses it to access the `mutation` and the `result` of the mutation.

```javascript
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (loading) {
        return <Loading />;
      }
      const { viewer } = data;
      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
```

```javascript
  <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
    // the mutation
    {(addStar, { data, loading, error }) => (
      <Button
        className={'RepositoryItem-title-action'}
        onClick={addStar}
      >
        {stargazers.totalCount} Star
      </Button>
    )}
  </Mutation>
```

When starring a repo, the `viewerHasStarred` boolean is returned in your mutation result. Apollo Client is clever enough to update the repository entity, which is normalized and accessible in the cache. You don’t need to handle the local state management yourself, since Apollo Client figures it out for you as long as you provide useful information in the mutation’s result. But, the `count` of starts after the mutation is not updated. We will have to handle the update in Apollo Client's cache yourself.

## Fragments

`Fragments` can be used to split parts of a query to reuse later.

```javascript
const REPOSITORY_FRAGMENT = gql`
fragment repository on Repository {
  id
  name
  url
  descriptionHTML
  primaryLanguage {
    name
  }
  owner{
    login
    url
  }
  stargazers {
    totalCount
  }
  viewerHasStarred
  watchers {
    totalCount
  }
  viewerSubscription
}`;

const GET_CURRENT_USER = gql`
{
  viewer {
    repositories(
      first: 5
      orderBy: { direction: DESC, field: STARGAZERS }
    ){
      edges {
        node {
          ...repository
        }
      }
    }
  }      
}
${REPOSITORY_FRAGMENT}`;
```

## refetchQueries

Using the `refetchQueries` option, or a `Mutation` component to trigger a refetch for all queries, is the naive approach for a mutation call. It isn't ideal because it costs another query reest to keep the data consistent after a mutation. The `Mutation` component offers a prop where you can insert update functionality that has access to the Apollo Client instance for the update mechanism.

# update

We can use `update` prop from `Mutation` to pass a function into it. This function has access to the Apollo Client and the mutation result in its argument. Both are needed to update data so you can destructure the mutation result in the function signature.

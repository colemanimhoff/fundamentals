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

The `Query` component uses this pattern to access the `result` of the query. The `Mutaiton` component uses it to access the `mutation` and the `result` of the mutation.

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
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

We can use `update` prop from `Mutation` to pass a function into it.

First, extract the function to keep `jsx` clean. This function has access to the Apollo Client and the mutation result in its argument. Both are needed to update data so you can de-structure the mutation result in the function signature. We can deconstruct the data object from the `mutation result` to get the repository id. The other option is the pass the `repositoryId` into `updateAddStar`. We have access to that in the `Repository` component.

Second, we use the Apollo Client to read data from the cache, but also write data to it. The goal is to:

1. `read` the starred repository from the cache via it's `id`
2. increment the `stargazers` count by 1
3. `write` the updated repository to the `cache`

The Apollo Client `cache` normalizes and stores queried data. Otherwise, the repository would be a deeply nested entity in a list of repositories for the query structure used in the `Profile` component. Normalization of a data structure makes it possible to retrieve entities by their identifier and their GraphQL `__typename` meta field. The resulting entity has all properties specified in the fragment. If there is a field in the fragment not found on the entity in the cache, you may see the following error message: `Can’t find field __typename on object .... That’s why we use the identical fragment to read from the local cache to query the GraphQL API`.

After you have retrieved the repository entity with a fragment and its composite key, you can update the count of stargazers and write back the data to your cache. In this case, increment the number of stargazers.

```javascript
const updateAddStar = (
  client,
  { data: { addStar: { starrable: { id } } } },
  ) => {
    const repository = client.readFragment({ id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    });
    const totalCount = repository.stargazers.totalCount + 1;
    client.writeFragment({
      id: `Repository:${id}`, fragment: REPOSITORY_FRAGMENT, data: {
      ...repository, stargazers: {
        ...repository.stargazers, totalCount,
      },
    },
  });
};
```

1. `read` the repository entity from the Apollo Client using an identifier and the fragment
2. `update` the information of the entity
3. `write` with updated information, keeping all remaining information intact using the JavaScript spread operator
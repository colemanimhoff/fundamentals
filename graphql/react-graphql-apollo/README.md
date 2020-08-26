# React GraphQL GitHub Apollo

Coding along with [The Road to GraphQL](https://www.robinwieruch.de/the-road-to-graphql-book)

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

Note you can pass a condition into the `skip` prop of a `Query` component to skip executing the query if that condition is true.

```javascript
<Query
  skip={organizationName === ''}
/>
```

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

## update

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

## Optimistic UI with Apollo in React

Optimistic UI with React Apollo makes everything onscreen more synchronous. For example, when liking a post, the like areas immediately. The request that is sent to the backend is asynchronous and doesn't resolve immediately. `Optimistic UI` immediately assumes a successful response. With a failed request, the optimistic UI performs a rollback and updates itself accordingly. 

Optimistic UI improves the user experience by omitting inconvenient feedback (e.g. loading indicators) for the user.

First, we will write the mutation:

```javascript
const WATCH_REPOSITORY = gql`
  mutation ($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(
      input: { state: $viewerSubscription, subscribableId: $id }
    ) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;
```
Then we implement the Mutation render prop component with the prop `optimisticResponse` and the pass the update function to the `update` prop.

```javascript
const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED'
};

const isWatch = viewerSubscription => {
  return viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;
};

const updateWatch = (
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription }
      }
    }
  }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  let { totalCount } = repository.watchers; totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED ? totalCount + 1
      : totalCount - 1;
  client.writeFragment({
    id: `Repository:${id}`, fragment: REPOSITORY_FRAGMENT, data: {
      ...repository, watchers: {
        ...repository.watchers, totalCount
      }
    }
  });
};

<Mutation
  mutation={WATCH_REPOSITORY}
  optimisticResponse={{
    updateSubscription: {
      __typename: 'Mutation',
      subscribable: {
        __typename: 'Repository',
        id,
        viewerSubscription: isWatch(viewerSubscription)
          ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
          : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
      }
    }
  }}
  variables={{
    id,
    viewerSubscription: isWatch(viewerSubscription)
      ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
      : VIEWER_SUBSCRIPTIONS.SUBSCRIBED
  }}
  update={updateWatch}
>
  {(updateSubscription, { data, loading, error }) => (
    <Button
      className="RepositoryItem-title-action"
      onClick={updateSubscription}
    >
      {watchers.totalCount}{' '}
      {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
    </Button>
  )}
</Mutation>
```

Clicking the "Watch" and "Unwatch" buttons changes synchronously, because of `optimistic ui`. The additional benefit of the optimistic response is that it makes the count of watchers update optimistically update too. The function used in the update prop is called twice now, the first time with the optimistic response, and the second with a response from GitHub’s GraphQL API.

## Pagination with Apollo in React

In order to implement pagination, we must extend our `GET_REPOSITORIES_OF_CURRENT_USER` query:

```javascript
const GET_REPOSITORIES_OF_CURRENT_USER = gql`
query ($cursor: String) {
  viewer {
    repositories(
      first: 5
      orderBy: { direction: DESC, field: STARGAZERS }
      after: $cursor
    ) {
      edges {
        node {
          ...repository
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }      
}
${REPOSITORY_FRAGMENT}`;
```
The `endCursor` can be used as the `$cursor` variable when fetching the next pages of repos, but the `hasNextPage` can disable the functionality to fetch another page. The initial request to fetch the first page of repositories will have a `$cursor` variable and GitHub’s GraphQL API will handle this. Every other request to fetch more items from the list will send a defined `after` argument with the cursor, which is the `endCursor` from the query.

Next we can conditionally render a button if the result's `hasNextPage` property is true:

```javascript
const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,],
      }
    }
  };
};

  {repositories.pageInfo.hasNextPage && (
    <button
      type="button"
      onClick={() => fetchMore({
        variables: {
          cursor: repositories.pageInfo.endCursor
        },
        updateQuery
      })}
    >
      More Repositories
    </button>
  )}
```

The `fetchMore` function performs the query from the initial request, and takes a configuration object, which can be used to override variables. With pagination, this means you pass the endCursor of the previous query result to use it for the query as after argument. Otherwise, you would perform the initial request again because no variables are specified.

The `updateQuery` function, using the spread operator, is used to tell `Apollo Client` how to merge the previous result with the new one.

## Caching Queries with Apollo Client in React

Apollo Client caches query requests. When navigating from the Profile page to the Organization page and back to the Profile page, the results appear immediately because the Apollo Client checks its cache before making the query to the remote GraphQL API.

## Prefetching in Apollo Client

Prefetching is a UX technique that can be deployed to the opitimisic UI technique. To do this with `Apollo React`, you must execute the query in an imperative way by using the the Apollo Client instance directly via `ApolloProvider`.

```javascript
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
```

```javascript
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
```
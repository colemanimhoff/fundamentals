# React with GraphQL

Coding along with [The Road to GraphQL](https://www.robinwieruch.de/the-road-to-graphql-book)

This application implements graphql without a dedicated library for GraphQL and, instead, uses only axios and HTTP to communicate with the GraphQL API.

## Getting Started

1. Create and copy a github API token
2. Create a `.env` file
3. Set your `token` to `REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN`
4. Run the following commands:

```bash
npm install
npm start
```

## Pros of This Approach

A puristic approach helps you understand the raw fundamentals of graphQL 

## Cons of This Approach

1. Updating the state-layer when resolving fetched data from the data-layer becomes verbose and complex, especially when dealing with deeply nested objects (overuse of the spread operator)
2. When using plain HTTP requests to interact with your GraphQL API, you are not leveraging the full potential of GraphQL. GraphQL can be used declaratively, and you can split queries into many queries to allow for reuse.
3. GraphQL doesn't make use of the full potential of HTTP and a library like axios
4. If you wanted to implement subscriptions, you would have to introduce `WebSockets`


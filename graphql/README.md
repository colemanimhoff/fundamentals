# GraphQL

## GraphQL vs REST

### REST

REST stands for Representational State Transfer. Everything with REST revolves around the idea of having resources that are accessible by URLs.

### GraphQL

- Created by Facebook
- Either a query (read), mutation (write), or subscription (continuous read)
- Each operation is a string that needs to be constructed according to the GraphQL query language specification
- Not opinionated about the network layer (HTTP) nor about the payload format
- Not opinionated at architecture at all; simply just a query language
- Shopify, Twitter, Yelp, and Coursea are a few companies that use GraphQL

## GraphQL Advantages

1. Declarative Data Fetching - the client selects data along with it's entities with fields across relationships in one query request
2. No over-fetching - the client can choose a different set of fields
3. Integrates vertically (React, Node, Angular) and horizontally (Golang, Ruby)
4. GraphQL schema, described on the server-side, is the single source of truth
5. Embraces modern trends
6. Schema stitching makes it possible to create one schema out of multiple schemas
7. Auto-generate API documentation with introspection, which makes it possible to retrieve schema from the API
8. Strongly typed
9. No API versioning is needed because in GraphQL, you can deprecate the API on a field level and the client will receive a warning
10. The GraphQL ecosystem is growing 
11. Teams can introduce a GraphQL gateway with schema stitching to consolidate a global schema

## GraphQL Disadvantages

1. Query complexity
2. Performance problems can arise if the client requests too many nested fields at once
3. Rate limiting is difficult
4. Caching is more complex than REST because, with REST, you can use the resource URL as an identifier

## Apollo

GraphQL is only the query language that has a reference implementation in JavaScript. Apollo builds its ecosystem on top to make GraphQL available for a wider audience, including the client-side and server-side. Apollo Engine is a GraphQL gateway.

### Apollo Advantages

1. The Apollo ecosystem offers many different solutions, including REST
2. Growing company and community
3. Airbnb, Twitch, The New York Times, and Medium all use Apollo
4. Lots of libraries, including Link
5. Great documentation
6. Apollo comes with built-in features such as normalizing nested data, error management, pagination, pre-fetching of data, and caching requests
7. Apollo is agnostic to other frameworks
8. Apollo embraces declarative programming over imperative programming
9. Apollo eliminates the need for asynchronous data fetching with Redux, or local React state
10. Apollo's development experience is convenient

### Apollo Disadvantages

1. GraphQL is in it's early stages
2. Apollo updates are rapid, leaving some obsolete versions neglected
3. Competition to Apollo are limited in comparison
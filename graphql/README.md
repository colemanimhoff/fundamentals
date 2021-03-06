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

## Apollo Client Alternatives (for React)

1. Relay - created by Facebook
2. urlql - created by Formidable Labs as a more simple alternative to Apollo
3. graphql.js - should not be mistaken for the GraphQL reference implementation
4. AWS Amplify GraphQL Client - for cloud-enabled applications

## Apollo Server Alternatives (for Node)

1. express-graphql - lower-level API to connect GraphQL to express
2. graphql-yoga - fully-featured GraphQL Server with focus on easy setup, performance, and great developer experience

## GraphQL Fundamentals

### GraphQL Operation: Query

In its most basic form, a query is just objects and fields, and objects can also be called fields.

```javascript
`{
    viewer {
        name
        url
    }
}`
```

```json
{
  "data": {
    "viewer": {
      "name": "Coleman Imhoff",
      "url": "https://github.com/colemanimhoff"
    }
  }
}
```

In this example, the viewer is an object with a wide range of fields. Here, we ask for just the name and url.

```javascript
`query { 
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}`
```

```json
{
  "data": {
    "organization": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react"
    }
  }
}
```

Here, we pass an `argument` to the field we are asking for. GitHub's API identifies an organization with a `login`.  You can add various arguments to various fields using GraphQL, which grants a huge amount of flexibility for structuring queries. Arguments can be different types. In this case we pass in a type `String` to the `login` argument.

```javascript
`query { 
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
  
  organization(login: "facebook") {
    name
    url
  }
}`
```

```json
{
  "errors": [
    {
      "path": [],
      "extensions": {
        "code": "fieldConflict",
        "fieldName": "organization",
        "conflicts": "{login:\"\\\"the-road-to-learn-react\\\"\"} or {login:\"\\\"facebook\\\"\"}"
      },
      "locations": [
        {
          "line": 2,
          "column": 3
        },
        {
          "line": 7,
          "column": 3
        }
      ],
      "message": "Field 'organization' has an argument conflict: {login:\"\\\"the-road-to-learn-react\\\"\"} or {login:\"\\\"facebook\\\"\"}?"
    }
  ]
}
```

The query above returns an argument conflict error. Using `aliases`, you can resolve the result into two blocks:

```javascript
`query { 
  book: organization(login: "the-road-to-learn-react") {
    name
    url
  }
  
  company: organization(login: "facebook") {
    name
    url
  }
}`
```

```json
{
  "data": {
    "book": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react"
    },
    "company": {
      "name": "Facebook",
      "url": "https://github.com/facebook"
    }
  }
}
```

Re-typing all the fields for multiple objects can be verbose. Defining a `fragment` to extract a query's reusable parts can help with this:

```javascript
`query { 
  book: organization(login: "the-road-to-learn-react") {
    ...sharedOrganizationFields
  }
  
  company: organization(login: "facebook") {
	...sharedOrganizationFields
  }
}

fragment sharedOrganizationFields on Organization {
  name
  url
}`
```

`returns the same data as above`

You must specify which `type` of object the fragment should be used.

Think about a query like a function, where it's important to provide dynamic arguments to it. That's where the `variable` in GraphQL comes in, as it allows arguments to be extracted as variables from queries.

```javascript
`query ($organization: String!) {
    organization(login: $organization) {
        name
        url 
    }
}`
```

You can declare a variable with the `$`. We get an error here because we expected the `organization` argument to not be null and of type `String`. Therefore we need to set a variable. You can do this in a the variables panel in the `GraphiQL` application like so:

```json
{
    "organization": "the-road-to-learn-react"
}
```

Variables can be used to create dynamic queries by providing a query that uses variables as arguments, which are available when the query is sent as a request to the GraphQL API. This is best practice.

You can also set a default variable, but it has to be a `non-required` argument. Otherwise, you will get an error:

```json
{
  "errors": [
    {
      "path": [
        "query"
      ],
      "extensions": {
        "code": "defaultValueInvalidOnNonNullVariable",
        "variableName": "organization"
      },
      "locations": [
        {
          "line": 1,
          "column": 8
        }
      ],
      "message": "Non-null variable $organization can't have a default value"
    }
  ]
}
```

The correct way to set a default argument:

```javascript
`query ($organization:String = "the-road-to-learn-react") {
  organization(login: $organization) {
    name
    url
  }
}`
```

`query` is the operation type. It can also be `mutation` or `subscription`. You can also define an `operation name`:

```javascript
`query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}`
```

This helps provide clarity for debugging and should be used inside an application. For example, if you view the `history` panel in `GraphiQL`, you can see a large amount of anonymous queries and one named query: `OrganizationForLearningReact`.

You can access a nested object from within the graph with a query like so:

Query:

```javascript
`query OrganizationForLearningReact(
  $organization: String!,
  $repository: String!
) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      name
    }
  }
}`
```

Variables:

```json
{
	"organization": "the-road-to-learn-react",
	"repository": "the-road-to-learn-react-chinese"
}
```

Response:

```json
{
  "data": {
    "organization": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react",
      "repository": {
        "name": "the-road-to-learn-react-chinese"
      }
    }
  }
}
```

We can use `directives` to query data from your GraphQL API and can be applied to fields and objects:

```javascript
`query OrganizationForLearningReact(
  $organization: String!,
  $repository: String!,
  $withFork: Boolean!
) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      name
      forkCount @include(if: $withFork)
    }
  }
}`
```

```json
{
    "organization": "the-road-to-learn-react", "repository":    "the-road-to-learn-react-chinese",
    "withFork": true
}
```

```json
{
  "data": {
    "organization": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react",
      "repository": {
        "name": "the-road-to-learn-react-chinese",
        "forkCount": 141
      }
    }
  }
}
```

An `include directive` includes the field when the `Boolean` type is set to true and the `skip directive`, which excludes it instead. We can decide if we want to include the forkCount in the `variables` object.

### GraphQL Operation: Mutation

Used for `writing` data instead of reading it and shares the same principles as a `query`: it has fields and objects, arguments and variables, fragments and operation names, as well as directives and nested objects for the return result.

With mutations, you can specify data as fields and objects that should be returned after it `mutates` into something acceptable.

```javascript
`query {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repository(name: "the-road-to-learn-react") {
      id
      name
    }
	}
}
`
```

The query above will return the following id:
`MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==`

Mutation:

```javascript
`mutation AddStar($repositoryId: ID!) {
  addStar(input: { starrableId: $repositoryId }) {
    starrable {
      id
      viewerHasStarred
    }
  }
}`
```

Variables:

```json
{
"repositoryId": "MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=="
}
```

Response:

```json
{
  "data": {
    "addStar": {
      "starrable": {
        "id": "MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==",
        "viewerHasStarred": true
      }
    }
  }
}
```

The mutation's name is `addStar` (given by github), which you are required to pass in a `starrableId` as `input` to identify the repository. This is a `named mutation` called `AddStar`. It's up to you to give it any name. Lastly, we can define what fields we want in our response. In this case, we are asking for `id` and `viewerHasStarred`. 

### GraphQL Pagination

```javascript
`query OrganizationForLearningReact {
    organization(login: "the-road-to-learn-react") {
        name
        url
        repositories(first: 2) {
            edges {
                node {
                    name
                }
            }
        }
    }
}`
```

```json
{
  "data": {
    "organization": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react",
      "repositories": {
        "edges": [
          {
            "node": {
              "name": "the-road-to-learn-react"
            }
          },
          {
            "node": {
              "name": "hackernews-client"
            }
          }
        ]
      }
    }
  }
}
```
The `first` argument is passed to the `repositories` list field that specifies how many items you want in your response. The query shape doesn't need to follow the `edges` and `node` structure, but ti's one of a few solutions to define paginated data structures and lists in GraphQL.

You can query for the `cursor` field to use to get the next set of data:

```javascript
`query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2) {
      edges {
        node {
          name
        }
        cursor
      }
    }
  }
}`
```

```json
{
  "data": {
    "organization": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react",
      "repositories": {
        "edges": [
          {
            "node": {
              "name": "the-road-to-learn-react"
            },
            "cursor": "Y3Vyc29yOnYyOpHOA8awSw=="
          },
          {
            "node": {
              "name": "hackernews-client"
            },
            "cursor": "Y3Vyc29yOnYyOpHOBGhimw=="
          }
        ]
      }
    }
  }
}
```

Now, we can use the cursor of the second repository to next the next 2, using the `after` argument.

```javascript
`query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2 after:"Y3Vyc29yOnYyOpHOBGhimw==") {
      edges {
        node {
          name
        }
        cursor
      }
    }
  }
}`
```

```json
{
  "data": {
    "organization": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react",
      "repositories": {
        "edges": [
          {
            "node": {
              "name": "react-local-storage"
            },
            "cursor": "Y3Vyc29yOnYyOpHOBUuT2A=="
          },
          {
            "node": {
              "name": "react-router-dynamic-routes-example"
            },
            "cursor": "Y3Vyc29yOnYyOpHOBlttHg=="
          }
        ]
      }
    }
  }
}
```

To keep the query dynamic, we extract its arguments as variables  The `after` argument can be `undefined` to retrieve the first page.

There are some additional ways to use meta information for your paginated list. You can remove the `cursor` field for an individual edge, but add the `pageInfo` object with its `endCursor` and `hasNextPage` fields. You can also request the `totalCount` of the list:

```javascript
`query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2 after:"Y3Vyc29yOnYyOpHOBGhimw==") {
      totalCount
      edges {
        node {
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`
```

```json
{
  "data": {
    "organization": {
      "name": "The Road to React",
      "url": "https://github.com/the-road-to-learn-react",
      "repositories": {
        "totalCount": 72,
        "edges": [
          {
            "node": {
              "name": "react-local-storage"
            }
          },
          {
            "node": {
              "name": "react-router-dynamic-routes-example"
            }
          }
        ],
        "pageInfo": {
          "endCursor": "Y3Vyc29yOnYyOpHOBlttHg==",
          "hasNextPage": true
        }
      }
    }
  }
}
```

`endCursor` and/or `hasNextPage` can be used to retrieve the successive list

## React with GraphQL

To access the client-side application:

```bash
cd react-graphql-github-vanilla
```

and follow instructions in the README.md
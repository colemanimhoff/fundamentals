# Apollo Server with Express

## Schema

The GraphQL `schema` provided to the Apollo Server is all the available data for reading and writing data via GraphQL. Schema consists of `type definitions`, starting with the mandatory top level `Query type` for reading data, followed by `fields` and `nested fields`. The leaf `nodes` of a schema are called `scalar types`, which consist of `String`, `Boolean`, `Int`, and more.

```javascript
const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;
```

## Resolvers

`Resolvers` are functions used to return data for fields from the schema. The data sources doesn't matter, because the data can be hardcoded, can come from a database, or from  another RESTful API endpoint. `Resolvers` are agnostic according to where the data comes from.

```javascript
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Coleman Imhoff'
      };
    }
  }
};
```

## 
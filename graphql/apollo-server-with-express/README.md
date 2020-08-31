# Apollo Server with Express

## Schema

The GraphQL `schema` provided to the Apollo Server is all the available data for reading and writing data via GraphQL. Schema consists of `type definitions`, starting with the mandatory top level `Query type` for reading data, followed by `fields` and `nested fields`. The leaf `nodes` of a schema are called `scalar types`, which consist of `String`, `Boolean`, `Int`, and more. A `schema` does not define where the data comes from.

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

The `ID` `scalar` type denotes an identifer used internally for advanced features like caching or re-fetching.

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

### Resolver Chains

Whenever a query asks for a field that contains an object type, the query also asks for at least one field of that object (if it didn't, there would be no reason to include the object in the query). A query always "bottoms out" on fields that contain either a scalar or a list of scalars.

Therefore, whenever Apollo Server resolves a field that contains an object type, it always then resolves one or more fields of that object. Those subfields might in turn also contain object types. Depending on your schema, this object-field pattern can continue to an arbitrary depth, creating what's called a `resolver chain`.

### Resolver Arguments

Resolver functions take the following positional arguments in order:

`parent` - the return value of the resolver for this field's parent (i.e., the previous resolver in the `resolver chain`)
`args` - an object that contains all GraphQL arguments provided for this field
`context` - an object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, data loader instances, and anything else to track across resolvers.
`info` - contains information about the operation's execution state, including the field name, the path to the field from the root, and more.

### Default Resolvers

If you don't define a resolver for a particular schema field, Apollo Server defines a default resolver for it.

The default resolver function uses the following logic:

- Does the parent argument have a property with this resolver's exact name?
  - No
    - Return `undefined`
  - Yes
    - Is that property's value a function?
      - No
        - Return the property's value
      - Yes
        - Call the function and return it's return value


A resolver can return arrays, objects and scalar types, but it has to be defined in the matching type definitions. Resolvers can return a `promise` and  GraphQL waits for the promise to resolve.

## Type Definitions

`Type definitions` are used to define the overall GraphQL `schema`. A GraphQL `schema` is defined by its types, the relationships between the types, and their structure by using a `Schema Definition Language (SDL)`.

A `!` after a field property means it's a `non-nullable` field.

`Arguments can be used to make more fine-grained queries because you an provide them to the GraphQL query.
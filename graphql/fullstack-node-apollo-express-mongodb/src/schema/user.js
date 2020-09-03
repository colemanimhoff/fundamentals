import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    me: User
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(username: String!): User!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;
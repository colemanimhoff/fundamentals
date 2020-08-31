import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();
app.use(cors());

const PORT = 8000;
const schema = gql`
  type Query {
    me: User
    message(id: ID!): Message!,
    messages: [Message!]!,
    user(id: ID!): User
    users: [User!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '2'
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '1'
  }
};
let users = {
  1: {
    id: '1',
    username: 'Coleman Imhoff',
    messageIds: [2],
  },
  2: {
    id: '2',
    username: 'Shaina Belton',
    messageIds: [1],
  },
};
const resolvers = {
  Query: {
    me: (_, __, { me }) => {
      return me;
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (_, { id }) => {
      return messages[id];
    },
    user: (_, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    }
  },
  Message: {
    user: (message) => {
      return users[message.userId];
    },
  },
  User: {
    messages: (user) => {
      return Object.values(messages).filter((message => message.userId === user.id));
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1]
  }
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
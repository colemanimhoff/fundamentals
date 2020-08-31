import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import models from './models/index.js';
import resolvers from './resolvers/index.js';
import schema from './schema/index.js';

const app = express();
app.use(cors());

const PORT = 8000;
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: models.users[1],
    models
  }
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import cors from "cors";
import express from "express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { connectDB } from "./models";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    context: {
      models,
    // me: users[1],
    },
    resolvers,
    typeDefs: schema,
  });

  app.use(cors());
  server.applyMiddleware({ app });

  await connectDB();
  app.listen({ port: 8000 }, () => {
    console.info(`Server ready at http://localhost:8000${server.graphqlPath}`);
  });
};

startServer();
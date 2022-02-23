import 'module-alias/register';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { dbConnect, addUsers } from '~src/Config';
import { createServer } from 'http';
import { typeDefs } from '~src/TypeDefs';
import { resolvers } from '~src/Resolver';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const startServer = async () => {
  const app = express();

  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await dbConnect();

  // await addUsers();

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );

  return { server: apolloServer, app };
};
startServer();

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fetchMoreUser: {
            keyArgs: false,
            merge: (existing, incoming, options) => {
              if (!existing) {
                return incoming;
              }
              const { args }: any = options;
              
              const page = args.page || 1;

              const existingData = existing.data || [];
              const d = {
                ...incoming,
                data: [...existingData, ...incoming.data],
              };
              return d;
            },
          },
        },
      },
    },
  }),
});

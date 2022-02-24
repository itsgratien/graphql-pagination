import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fetchMoreUser: {
            keyArgs: false,
            merge: (existing, incoming) => {
              if (!existing) {
                return incoming;
              }
              console.log('exsit', incoming);

              const merged = existing.data.slice(0) || [];

              const incomingData = incoming.data || [];

              for (let i = 0; i < incomingData.length; i++){
                 merged[incoming.offset + i] = incomingData[i]
              }
              const d = {
                page: incoming.page,
                offset: incoming.offset,
                total: incoming.total,
                data: merged,
              };
              return d;
            },
          },
        },
      },
    },
  }),
});

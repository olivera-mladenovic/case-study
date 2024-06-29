import React from 'react';
import App from './App';

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:5001'
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export const Provider: React.FC = () => {
    return (
        <ApolloProvider client={client}><App /></ApolloProvider>
    )
}
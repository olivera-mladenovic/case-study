import React from 'react';
import App from './App';

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:5001'
});

const authLink = setContext(()=> {
    const token = window.localStorage.getItem('token');
    return  {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //link: httpLink,
    cache: new InMemoryCache()
})

export const ApolloGraphQLProvider: React.FC = () => {
    return (
        <ApolloProvider client={client}><App /></ApolloProvider>
    )
}
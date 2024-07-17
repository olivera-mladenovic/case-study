import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloGraphQLProvider } from './ApolloProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloGraphQLProvider />
  </React.StrictMode>,
)

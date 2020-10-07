import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'
import {setContext} from 'apollo-link-context'


const httpLink = createHttpLink({
    uri: 'https://dashboard.heroku.com/apps/crmgraphql-back/logs',
    fetch
})


const authLink = setContext((_,{headers}) => {

   let token = localStorage.getItem('token')
 
    return {
        headers: {...headers, authorization: token ? `Bearer ${token}` : '' }
    }
})


const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})


export default client
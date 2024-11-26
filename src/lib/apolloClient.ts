import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const createApolloClient = () => {

    // httpLink connect to graphql server
    const httpLink = new HttpLink({
        uri: '/api/graphql',
        credentials: 'same-origin'
    })
    // for manage data locally
    const cache = new InMemoryCache()

    // will handle data fetching and state management 
    return new ApolloClient({
        link: httpLink,
        cache: cache
    })
}

const apolloClient = createApolloClient()
export default apolloClient
import ApolloClient, { createNetworkInterface } from 'apollo-client'
const endpoints = {
    wss: 'wss://subscriptions.graph.cool/v1/cj3ec1p9c3h9g0189gm3qmktg',
    https: 'https://api.graph.cool/simple/v1/cj3goqcwxeone0162mo673455'
};
//import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

// // __SUBSCRIPTIONS_API_ENDPOINT_ looks similar to: `wss://subscriptions.graph.cool/v1/<PROJECT_ID>`
// const wsClient = new SubscriptionClient(endpoints.wss, {
//   reconnect: true,
// })

// __SIMPLE_API_ENDPOINT_ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
const networkInterface = createNetworkInterface({ 
	uri: endpoints.https,
	headers: {
		Authorization: `Bearer: localStorage.getItem('auth0IdToken')`
	}
})
console.log(networkInterface,localStorage.getItem('auth0IdToken'));
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// )

export default new ApolloClient({
	networkInterface: networkInterface,
	dataIdFromObject: o => o.id,
	connectToDevTools: true
});
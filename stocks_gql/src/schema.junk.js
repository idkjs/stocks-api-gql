// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';
import fetch from 'node-fetch'
import _ from 'lodash'

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    stocks(count: Int!): [ExchangeData]
  }
  
  type ExchangeData {
    timestamp: Float
    index: Int
    stocks: Bourses
	}
  
  type Bourses {
		NASDAQ: Float
		CAC40: Float
  }

`;
function numDisplay(x) {
    return parseFloat(x.toString().substr(0, 4));
}
const resolvers = {
    Query: {
        stocks: async (root, { count }) => {
            try {
                const results = await fetch(`http://localhost:8080/stocks?count=${count}`)

                const data = await results.json()
                console.log("DATA")
                console.log(data.length)
                console.log("-------------")

                // return data
                return data
            } catch (e) {
                console.err(e)
            }
        }
    },
};

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

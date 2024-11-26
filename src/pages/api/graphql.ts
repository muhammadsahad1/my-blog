import { ApolloServer, gql } from 'apollo-server-micro'
import mongoose, { Query } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const typeDefs = gql`

type Post {
id :ID!,
title : String!,
content : String!
}

type Query {
posts : [Post!]!
}

type Mutation {
    createPost(title : String!,content : String!) : Post!
}

`;

const resolvers = {
    Query: {
        posts: async () => {
            const post = mongoose.model('Post', new mongoose.Schema({
                title: String,
                content: String

            }))
            return post.find({})
        },
    },
    Mutation: {
        createPost: async (_: any, { title, content }: { title: string, content: string }) => {
            const Post = mongoose.model('Post', new mongoose.Schema({
                title: String,
                content: String
            }))
            const post = new Post({ title, content })
            await post.save()
            return post

        }
    }
}



// Apollo server setup
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "options") {
        res.end()
        return false
    }

    await apolloServer.start()
    return apolloServer.createHandler({ path: '/api/grapql' })
}

export const config = {
    api: {
        bodyParse: false
    },
}

const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type user{
        id: ID!
        userName: String!
        firstName: String!
        lastName: String!
        password: String!
        email: String!
        type: String!
    }
    type Query {
        getUsers: [user]
        getUserbyId(id: ID!):user
    }
    type Mutation {
        addUser (
            userName: String!
            firstName: String!
            lastName: String!
            password: String!
            email: String!
            type: String!
        ):user
    }
`
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
    type listing{
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postel_code: String!
        price: Float!
        email: String!
        username: String!
    }
    type Query {
        getUsers: [user]
        getUserbyId(id: ID!):user
        getUsersbyname(userName: String!):user
        getListings(username: String!): [listing]
        testlogin(userName: String!, password: String!):[String]
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
        addUserlisting(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city:  String!
            postal_code:  String!
            price: Float!
            email: String!
            username: String!
            password: String!
        ):listing
    }
`
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
        postel_code: String
        price: Float!
        email: String!
        username: String!
    }
    type userListing{
        listing_id: String! 
        booking_id: String!
        booking_start: String!
        booking_end: String!
        userName: String!
    }
    type Query {
        getUsers: [user]
        getUserbyId(id: ID!):user
        getUsersbyname(userName: String!):user
        getAdminListings: [listing]
        getuserListings:[userListing]
        getAdminlistingsbyCity(city: String!):[listing]
        getAdminlistingsbyUsername(userName:String):[listing]
        login(userName: String!, password: String!):[String]
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
        addAdminlisting(
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
        addUserListing(
        listing_id: String! 
        booking_id: String!
        booking_start: String!
        booking_end: String!
        userName: String!
        ):userListing
    }
`
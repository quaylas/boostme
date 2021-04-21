const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Benefactor {
        _id: ID
        benefactorName: String
        about: String
        age: Int
        donations: [Donation]
        donationTotal: Float
    }

    type Donation {
        _id: ID
        donationDate: String
        donorEmail: String
        benefactor: String
        amount: Float
        message: String
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        donations: [Donation]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!):  Auth
        
    }
`;

module.exports = typeDefs;
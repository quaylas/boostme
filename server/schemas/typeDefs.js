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
        getBenefactors: [Benefactor]
        getBenefactor(benefactorName: String!): Benefactor
        getDonations: [Donation]
        getDonation(_id: ID!): Donation

    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!):  Auth
        addDonation(benefactor: String!, amount: Float!, message: String): Donation
        addBenefactor(benefactorName: String!, about: String!, age: Int!): Benefactor
        deleteDonation(_id: ID!): User
    }
`;

module.exports = typeDefs;
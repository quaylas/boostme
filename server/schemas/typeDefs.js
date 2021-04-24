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

    type Checkout {
        session: ID
    }

    type Donation {
        _id: ID
        donationDate: String
        donorEmail: String
        benefactor: String
        amount: Float
        message: String
        donorName: String
    }

    type Order {
        _id: ID
        purchaseDate: String
        donations: [Donation]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        donations: [Donation]
        orders: [Order]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        getBenefactors: [Benefactor]
        getFilteredBenefactors(searchTerm: String!): [Benefactor]
        getBenefactor(benefactorName: String!): Benefactor
        getDonations: [Donation]
        getFilteredDonations(searchTerm: String!): [Donation]
        getDonation(_id: ID!): Donation
        getOrders: [Order]
        checkout(products: [ID]!): Checkout
        order(_id: ID!): Order
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!):  Auth
        addDonation(benefactor: String!, amount: Float!, message: String): Donation
        addBenefactor(benefactorName: String!, about: String!, age: Int!): Benefactor
        addOrder(donations: [ID]!): Order
        deleteDonation(_id: ID!): User
    }
`;

module.exports = typeDefs;
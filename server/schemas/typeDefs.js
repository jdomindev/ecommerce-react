const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    
  }

  type Product {
    _id: ID!
    productName: String!
    price: Int!
    description: String
    sku: [String]
  }

  type Payment {
    _id: ID!
    userId: ID!
    type: String
    status: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User!
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth


  }
`;

module.exports = typeDefs;
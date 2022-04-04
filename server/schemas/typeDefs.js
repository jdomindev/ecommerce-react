const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    products: [Product]
    orders: [Order]
  }

  type Product {
    _id: ID!
    productName: String!
    price: Float!
    description: String!
    category: String
    categoryId: String
    skuSeq: Float
    sku: String
  }

  type Order {
    _id: ID!
    userId: String!
    amount: Int!
    trackingNumber: String
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
    me(_id: ID!): User!
    products: [Product]
    orders: [Order]
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth

    addProduct(userId: ID!, _id: ID!): User
    


  }
`;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    orders: [Order]
  }

  type Address {
    _id: ID!
    streetName: String
    aptNo: String
    zipCode: Int
    city: String
    state: String
    country: String
  }

  type Order {
    _id: ID!
    user: User
    shippingAddress: Address
    billingAddress: Address
    products: [Product]
    amount: Int
    trackingNumber: String
  }

  type Product {
    _id: ID!
    name: String
    price: Float
    image: String
    description: String
    category: Category
    deptCode: String
    type: String
    quantity: Int
    skuSeq: String
    sku: String
  }

  type Category {
    _id: ID!
    name: String
  }

  type Payment {
    _id: ID!
    userId: ID!
    type: String
    status: String
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(_id: ID!): User!
    products: [Product]
    orders: [Order]
    addresses: [Address]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth

    createOrder(userId: ID!): Order
    addOrder(userId: ID!, orderId: ID!): User

    createAddress(streetName: String!, aptNo: String, zipCode: Int!, city: String!, state: String!, country: String!): Address
    addAddress(orderId: ID!, shippingAddress: [String], billingAddress: [String]): Order
    
    addProduct(orderId: ID!, _id: ID!): Order

    
  }
`;

module.exports = typeDefs;
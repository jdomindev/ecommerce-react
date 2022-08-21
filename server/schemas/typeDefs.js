const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    orders: [Order]
    address: Address
  }

  type Order {
    _id: ID!
    purchaseDate: String
    products: [Product]
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

  type Checkout {
    session: ID
  }

  type Category {
    _id: ID!
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Address {
    _id: ID
    street: String
    aptNo: String
    zipCode: String
    city: String
    state: String
    country: String
  }

  type Payment {
    _id: ID!
    userId: ID!
    type: String
    status: String
    session: ID
  }

  type Query {
    me: User
    products: [Product]
    categories: [Category]
    order(_id: ID!): Order
    address(_id: ID!): Address
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateAddress(street: String, aptNo: String, city: String, state: String, zipCode: String, country: String ): User

    addOrder(products: [ID]!): Order

    createAddress(street: String!, aptNo: String, zipCode: Int!, city: String!, state: String!, country: String!): Address



    addAddress(orderId: ID!, shippingAddress: [String], billingAddress: [String]): Order

    
  }
`;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String
    firstName: String!
    lastName: String!
    
  }



  type Auth {
    token: ID!
    user: User
  }

  type Query {
    
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth


  }
`;

module.exports = typeDefs;
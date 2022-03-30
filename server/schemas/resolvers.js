const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Payment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    


  },

  Mutation: {
    addUser: async (parent, { email, password, firstName, lastName }) => {
      const user = await User.create({ email, password, firstName, lastName });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    
      
      

  },

  
  
};

module.exports = resolvers;
const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Payment, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // if (context.user) {
        // context.user
        const userFound = await User.findOne({ _id: args._id }).select("-__v -password").populate('orders').populate('products');
        // console.log(userFound)
        // console.log(context.user)
        // _id: context.user._id

        return userFound
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    
    products: async () => {
      return Product.find();
    },

    orders: async () => {
      return Order.find();
    },


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

    addProduct: async (parent, args, context) => {
      // if (context.user) {
        const updatedCart = await User.findOneAndUpdate(
              { _id: args.userId },
              { $push: { products: args._id } },
              { new: true, runValidators: true }
          ).populate('products')
      return updatedCart; 
      // }
      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
      // { $set: { fandoms: args.fandomsArray } },
    },

    

    
      
      

  },

  
  
};

module.exports = resolvers;
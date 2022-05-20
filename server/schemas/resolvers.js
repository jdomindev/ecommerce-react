const { AuthenticationError } = require('apollo-server-express');
const { User, Address, Product, Payment, Order } = require('../models');
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
      return Order.find()
    },

    addresses: async () => {
      return Address.find()
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

    createOrder: async (parent, {userId}, context) => {
       // if (context.user) {
      const order = await Order.create({ user: userId})
      return order; 
    // }
      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
      // { $set: { fandoms: args.fandomsArray } },
    },

    addOrder: async (parent, {userId, orderId}, context) => {
      // if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
              { _id: userId },
              { $set: { orders: orderId } },
              { new: true, runValidators: true }
          ).populate('orders').populate('products')
      return updatedUser; 
      // }
      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
      // { $set: { fandoms: args.fandomsArray } },
    },



    createAddress: async (parent, {streetName, aptNo, zipCode, city, state, country}, context) => {
        const address = await Address.create({streetName, aptNo, zipCode, city, state, country})
      return address; 
    },

    // addAddress
    // adds billing and shipping address to order
    addAddress: async (parent, {orderId, shippingAddress, billingAddress}, context) => {
      // if (context.user) {
        const updatedCart = await Order.findOneAndUpdate(
              { _id: orderId },
              { $set: { shippingAddress, billingAddress } },
              { new: true, runValidators: true }
          )
      return updatedCart; 
      // }
      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
      // { $set: { fandoms: args.fandomsArray } },
    },

    addProduct: async (parent, args, context) => {
      // if (context.user) {
        const updatedCart = await Order.findOneAndUpdate(
              { _id: args.orderId },
              { $push: { products: args._id } },
              { new: true, runValidators: true }
          ).populate('user').populate('products')
      return updatedCart; 
      // }
      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
      // { $set: { fandoms: args.fandomsArray } },
    },
    // addOrder: async (parent, { products }, context) => {
    //   console.log(context);
    //   if (context.user) {
    //     const order = new Order({ products });

    //     await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

    //     return order;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },
    

    

    
      
      

  },

  
  
};

module.exports = resolvers;


// GOOD

// queries

// addUser
// login 
// createOrder (new Order)
// addOrder (adds Order to User's orders)
// createAddress (new Address)
// addProduct (to Order)
// addAddress (Addresses to Order)


// NEED

// editUser (email, password, firstName, lastName)
// editAddress (shipping and billing)




// User Process

// signup
// login
// look at products OR look at profile 
// add product to cart (addProduct)
// save for later? wishlist vs cart?
// checkout product ()
// buy product

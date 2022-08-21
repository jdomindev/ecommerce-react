const { AuthenticationError } = require('apollo-server-express');
const { User, Address, Product, Order, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')(`${process.env.STRIPE_PRIVATE_KEY}`);

const resolvers = {
  Query: {

    me: async (parent, args, context) => {
      if (context.user) {
        // context.user
        const userFound = await User.findOne({ _id: context.user._id }).select("-__v -password").populate({
          path: 'orders.products',
          populate: 'category'
        });
        // _id: context.user._id
        userFound.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return userFound
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    products: async () => {
      return Product.find().populate('category');
    },

    categories: async () => {
      return Category.find();
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    addresses: async () => {
      return Address.find()
    },
    
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];
      
      const order = new Order({ products: args.products });

      const { products } = await order.populate('products').execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });
        

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: Math.round(products[i].price * 100),
          currency: 'usd',
        });


        line_items.push({
          price: price.id,
          quantity: 1
        });

      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      

      return { session: session.id };
    }
  },

  Mutation: {
    addUser: async (parent, { email, password, firstName, lastName }) => {
      const user = await User.create({ email, password, firstName, lastName });
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, { email, password, firstName, lastName }) => {
      const user = await User.findOneAndUpdate({ email, password, firstName, lastName });
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

    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
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

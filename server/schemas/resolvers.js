const { AuthenticationError } = require("apollo-server-express");
const { User, Address, Product, Order, Category } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(`${process.env.STRIPE_PRIVATE_KEY}`);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // context.user
        // args
        const userFound = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate([
            {
              path: "orders.products",
              populate: "category",
            },
          ]);
        // _id: context.user._id
        // _id: args._id
        userFound.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return userFound;
      }
      throw new AuthenticationError("You need to be logged in!");
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
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },

    address: async (parent, args, context) => {
      if (args) {
        const user = await User.findById(args._id).populate("address");
        // context.user._id
        return user.address;
      }

      // throw new AuthenticationError('Not logged in');
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const imagesUrl = "https://d2dre0lzik6pal.cloudfront.net"; 
      const line_items = [];
      
      // If user logged in, add cart to user's orders
      if (context.user) {
        const order = new Order({ products: args.products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
      
        const { products } = await order.populate("products").execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          // images stored on s3 bucket redirected to cloudFront distribution
          images: [imagesUrl + products[i].image],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: Math.round(products[i].price * 100),
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        }); 
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    }
    throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { email, password, firstName, lastName }) => {
      const user = await User.create({ email, password, firstName, lastName });
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        // context.user
        // args
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      // context.user._id
      // args._id

      throw new AuthenticationError("Not logged in");
    },

    addAddress: async (parent, args, context) => {
      if (context.user) {
        const address = new Address({ args });
        await User.findByIdAndUpdate(
          context.user._id,
          { $set: { address: address } },
          { new: true }
        );
        return address;
      }
    },

    updateAddress: async (parent, args, context) => {
      if (context.user) {
        // context.user
        // _id, street, aptNo, city, state, zipCode, country
        const address = new Address(args);
        // newAddress
        return await User.findByIdAndUpdate(
          context.user._id,
          {
            $push: {
              address: address,
            },
          },
          { new: true }
        );
      }
      // context.user._id

      throw new AuthenticationError("Not logged in");
    },

    createAddress: async (
      parent,
      { streetName, aptNo, zipCode, city, state, country },
      context
    ) => {
      const address = await Address.create({
        streetName,
        aptNo,
        zipCode,
        city,
        state,
        country,
      });
      return address;
    },
  },
};

module.exports = resolvers;
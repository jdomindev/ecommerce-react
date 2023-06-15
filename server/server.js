const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors");

const { typeDefs, resolvers } = require("./schemas");
// Import `authMiddleware()` function to be configured with the Apollo Server
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //   // Add context to our server so data from the `authMiddleware()` function can pass data to our resolver functions
  context: authMiddleware,
});

server.applyMiddleware({ app });

// Set up a whitelist and check against it:
var whitelist = [
  "https://ecommerce-react-backend.onrender.com",
  "https://ecommerce-react-backend.onrender.com/graphql",
  "https://d2dre0lzik6pal.cloudfront.net"
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Then pass them to cors:
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

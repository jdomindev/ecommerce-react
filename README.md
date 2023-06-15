# E-Commerce Template Site

## About this App

This website was created to be a template for users to build their own simple e-commerce site. Users of the e-commerce site can create an account, log in, select items to add to their cart, and checkout out using stripe’s secure checkout process.

## Site Demo

### Credentials 

To preview the site as a guest user, these credentials may be used:

```Email: test@test.com```

```Password: password```

### Checkout

<mark>Stripe checkout is in *Test Mode* so there are no transaction costs for the user.</mark>

Use any info you like for the name and zip code section of checkout, however since this Stripe instance is in *Test Mode* you must use one of the test cards from the test card list as specified in the [Stripe API](https://stripe.com/docs/testing#cards).


Here is the test Visa card:

```
Credit Card: 4242 4242 4242 4242
CVC: any 3 digits
Expiration Date: any future date
```

# Installation and setup

Once the repo is forked:

1. ```run npm install``` to install all the dependencies needed.
2. Then run ```npm run start``` to start up the server and client.

To start only the backend:

1. ```npm run server```

## Forking app as template

For those who wish to use this template, all I ask is that you give me proper credit by linking back to my [GitHub Repo](https://github.com/jdomindev/ecommerce-react).

### Prerequisites

#### MongoDB

A [Mongo database](https://www.mongodb.com/basics/create-database) is needed to store the product and user information. You will need create an env file and enter your own MongoDB URI. 

#### Stripe

In addition, if you plan to use Stripe for the checkout process, you will need to [create an account](https://dashboard.stripe.com/register) and add your public key and private key to your env file. 

#### JWT

Login authentication is handled by JSON Web Tokens. A secret is required for authentication to work. The secret can be any thing you like, just add it to the env file.

##### Example of the env file:

```
MONGODB_URI = YOUR_MONGO_URI
STRIPE_PRIVATE_KEY = YOUR_PRIVATE_KEY
STRIPE_PUBLIC_KEY = YOUR_PUBLIC_KEY
SESSION_SECRET = YOUR_OWN_SECRET
```

## Adding Your Own Products

To add your own products you need to fill out the *productSeeds* and *categorySeeds* jsons in the *seeders* folder with your own products and categories. 

For products to have an associated category, you need to enter its ID into the product json. 
- Category IDs are generated in MongoDB after seeding the categories, so the <mark>category json should be run first.</mark> 
- It may be helpful to have MongoDB Compass installed to see the category IDs and then add those to each product.

Once a json is filled out run `npm run seed` to populate your database.

## Screenshots

## Badges
![React-Badge](https://img.shields.io/badge/Code-React-blue)
![Node-Badge](https://img.shields.io/badge/Code-Node-blue)
![MongoDB-Badge](https://img.shields.io/badge/Code-MongoDB-blue)
![Apollo-GraphQL-Badge](https://img.shields.io/badge/Code-GraphQL-blue)
![Express-Badge](https://img.shields.io/badge/Code-Express-blue)
![Javascript-Badge](https://img.shields.io/badge/Code-JavaScript-blue)
![HTML-Badge](https://img.shields.io/badge/Code-HTML-blue)
![CSS-Badge](https://img.shields.io/badge/Code-CSS-blue)
![Bootstrap-Badge](https://img.shields.io/badge/Library-Bootstrap-blueviolet)
![Render-Badge](https://img.shields.io/badge/Deployment-Render-orange)
![License-Badge](https://img.shields.io/badge/License-MIT-lightgrey)

## License

MIT License

Copyright (c) 2023 Jose Dominguez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
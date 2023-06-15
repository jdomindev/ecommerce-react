const db = require('../config/connection');
const { User, Product, Category } = require('../models');
const { getSku } = require('../utils/skuGenerator');
const categorySeeds = require('./categorySeeds.json')

db.once('open', async () => {
  try {
    // Delete existing categories (needed to not create duplicates)
      // await Category.deleteMany({});

    // Delete existing products
    await Product.deleteMany({});
    
    // Creates categories from categorySeeds
      // await Category.create(categorySeeds)
    
    // Creates products from productSeeds with SKU IDs
    await Product.create(getSku())
    
  

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
const db = require('../config/connection');
const { User, Product, Category } = require('../models');
const {getSku} = require('../utils/skuGenerator');
const categorySeeds = require('./categorySeeds.json')

db.once('open', async () => {
  try {
    // await User.deleteMany({});
    // await Category.deleteMany({});
    await Product.deleteMany({});
    
    // await Category.create(categorySeeds)
    await Product.create(getSku())
    
    // await Fandom.create(fandomSeeds);


    // const allFandoms = await Fandom.find({})
    // const allUsers = await Users.find({})

    // const fandomIds = allFandoms.map(fandom => fandom._id)
    // console.log(fandomIds)
    // for (let index = 0; index < allUsers.length; index++) {
    //   const singleUser = allUsers[index];
    //   singleUser.fandoms.push(fandomIds[Math.floor(Math.random() * fandomIds.length)])
    //   console.log(singleUser)
    // }
    // math.random on fandomIds[random]

  

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
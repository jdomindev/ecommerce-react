const productSeeds = require('../seeders/productSeeds');

// 1.) Start sku numbers with a top-level identifier (dept no, store no.)
// 2.) Use the middle numbers to assign unique identifiers (size, color, item type, subcategory)
// 3.) Finish sku with sequential number

// thinking 7 digits, 2 for dept. no, 2 for subcat, 3 for number  

module.exports = {
    getSku: function() {
            const productFinal = productSeeds.map(product => ({ ...product, sku: (product.productName.substring(0,2) + product.categoryId + product.skuSeq)
            }))
            return productFinal
        }
}

  


const connectDb = require("./dbConnection");
const Product = require("./models/productModel");
async function main() {
  const products = await Product.find({
    'suppliers.date': { $gte: new Date('2021-01-01'), $lt: new Date('2021-02-01') }
  }, 'name');
  console.log(products.map(p => p.name));
  process.exit(0);
}
connectDb(); main();
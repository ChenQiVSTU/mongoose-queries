const connectDb = require("./dbConnection");
const Product = require("./models/productModel");
async function main() {
  const products = await Product.find({
    name: { $in: [/printer/i, /computer/i] },
    'suppliers.date': { $gte: new Date('2021-01-01'), $lt: new Date('2022-01-01') }
  }).populate('suppliers.supplierId', 'name');
  const vendors = new Set();
  products.forEach(p => p.suppliers.forEach(s => s.supplierId && vendors.add(s.supplierId.name)));
  console.log([...vendors]);
  process.exit(0);
}
connectDb(); main();
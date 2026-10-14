const connectDb = require("./dbConnection");
const Product = require("./models/productModel");
async function main() {
  const res = await Product.aggregate([
    { $unwind: '$suppliers' },
    { $group: { _id: '$suppliers.supplierId', total: { $sum: '$suppliers.price' } } },
    { $match: { total: { $gt: 70000 } } },
    { $lookup: { from: 'Suppliers', localField: '_id', foreignField: '_id', as: 'supplier' } },
    { $project: { total: 1, name: '$supplier.name' } }
  ]);
  console.log(JSON.stringify(res, null, 2));
  process.exit(0);
}
connectDb(); main();
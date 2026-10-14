const connectDb = require("./dbConnection");
const Product = require("./models/productModel");
async function main() {
  const res = await Product.aggregate([
    { $unwind: '$suppliers' },
    { $sort: { 'suppliers.price': -1 } },
    { $group: { _id: '$name', maxPrice: { $first: '$suppliers.price' }, supplierId: { $first: '$suppliers.supplierId' } } },
    { $lookup: { from: 'Suppliers', localField: 'supplierId', foreignField: '_id', as: 'supplier' } },
    { $project: { maxPrice: 1, supplier: '$supplier.name' } }
  ]);
  console.log(JSON.stringify(res, null, 2));
  process.exit(0);
}
connectDb(); main();
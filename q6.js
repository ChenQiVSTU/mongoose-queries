const connectDb = require("./dbConnection");
const Product = require("./models/productModel");
async function main() {
  const res = await Product.aggregate([
    { $match: { 'suppliers.date': { $gte: new Date('2021-01-01'), $lt: new Date('2022-01-01') } } },
    { $unwind: '$suppliers' },
    { $match: { 'suppliers.date': { $gte: new Date('2021-01-01'), $lt: new Date('2022-01-01') } } },
    { $group: { _id: { $month: '$suppliers.date' }, orders: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  console.log(JSON.stringify(res, null, 2));
  process.exit(0);
}
connectDb(); main();
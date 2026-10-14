const mongoose = require("mongoose");
const connectDb = require("./dbConnection");
const Suppliers = require("./models/supplierModel");
const Product = require("./models/productModel");
const D = (s) => new Date(s);
const oid = () => new mongoose.Types.ObjectId();

async function main() {
  await connectDb();
  const host = mongoose.connection.host;
  if (!/localhost|127\.0\.0\.1/.test(host)) {
    console.log(`REFUSED: current DB host is "${host}". Seeding is allowed only on a local DB.`);
    process.exit(1);
  }
  await Promise.all([Suppliers.deleteMany({}), Product.deleteMany({})]);

  const tf = oid(), dp = oid(), pp = oid(), cw = oid();
  await Suppliers.create([
    { _id: tf, name: "TechnoForce", phoneNumber: "+7-902-111-0001", address: { city: "Vladivostok", street: "Svetlanskaya", house: "50" } },
    { _id: dp, name: "DigitalPlus", phoneNumber: "+7-902-111-0002", address: { city: "Khabarovsk", street: "Muravyova-Amurskogo", house: "12" } },
    { _id: pp, name: "PrintPro", phoneNumber: "+7-902-111-0003", address: { city: "Novosibirsk", street: "Krasny Prospekt", house: "30" } },
    { _id: cw, name: "CompWorld", phoneNumber: "+7-902-111-0004", address: { city: "Minsk", street: "Nezavisimosti", house: "8" } }
  ]);

  await Product.create([
    { _id: oid(), name: "Printer", description: "laser printer", stock: 12, tags: ["printer"],
      suppliers: [
        { price: 18000, date: D("2021-01-12"), supplierId: pp },
        { price: 21000, date: D("2021-01-25"), supplierId: cw },
        { price: 15000, date: D("2020-11-03"), supplierId: tf } ] },
    { _id: oid(), name: "Computer", description: "desktop PC", stock: 8, tags: ["computer"],
      suppliers: [
        { price: 40000, date: D("2021-01-18"), supplierId: dp },
        { price: 35000, date: D("2021-03-04"), supplierId: dp },
        { price: 52000, date: D("2021-08-19"), supplierId: cw } ] },
    { _id: oid(), name: "Monitor", description: "27 inch IPS", stock: 20, tags: ["monitor"],
      suppliers: [
        { price: 12000, date: D("2021-05-09"), supplierId: dp },
        { price: 9000, date: D("2021-05-11"), supplierId: tf },
        { price: 13500, date: D("2022-02-14"), supplierId: pp } ] },
    { _id: oid(), name: "Laptop", description: "15 inch notebook", stock: 5, tags: ["computer"],
      suppliers: [
        { price: 64000, date: D("2021-11-02"), supplierId: cw },
        { price: 61000, date: D("2021-11-20"), supplierId: dp },
        { price: 5900, date: D("2021-11-28"), supplierId: pp } ] },
    { _id: oid(), name: "Scanner", description: "flatbed scanner", stock: 15, tags: ["printer"],
      suppliers: [
        { price: 6000, date: D("2021-07-15"), supplierId: pp },
        { price: 5000, date: D("2021-12-08"), supplierId: dp },
        { price: 8000, date: D("2021-04-01"), supplierId: tf } ] }
  ]);

  console.log("inserted:", await Suppliers.countDocuments(), "suppliers,", await Product.countDocuments(), "products");
  process.exit(0);
}
main();
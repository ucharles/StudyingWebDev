const mongoose = require("mongoose");
const Product = require("./models/product");

// return promise
mongoose
  .connect("mongodb://localhost:27017/product_test")
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });

const createProduct = async (req, res, next) => {
  const createProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  // 이 시점에 이미 id가 설정됨.. 이것은 mongoDB의 사양.
  // mongoose에서 제공하는 DB에 저장하는 메소드 save()
  const result = await createProduct.save();
  console.log(typeof createProduct._id);
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;

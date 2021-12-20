const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/place_test";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  // mongo client에 url을 제시한 것 뿐.
  const client = new MongoClient(url);

  try {
    // 이 시점에서 DB와 연결됨.
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "could not store data." });
  }
  client.close();

  res.json(newProduct);
};
const getProducts = async (req, res, next) => {};

exports.createProduct = createProduct;
exports.getProducts = getProducts;

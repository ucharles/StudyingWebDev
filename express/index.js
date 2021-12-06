const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const Product = require("./schema/product.schema");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
  console.log("mongoose connection open to database: test");
}

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));

// Starting server
app.listen(3000, () => {
  console.log("app is listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("<h1>main page</h1>");
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.post("/products", async (req, res) => {
  // const inputProduct = req.body;
  // const result = await new Product({
  //   name: inputProduct.name,
  //   price: inputProduct.price,
  //   category: inputProduct.category,
  // });
  // result.save();
  // console.log(result);
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
  res.redirect("products");
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).catch((e) => {
    console.log(e);
    res.send("can not found product");
  });
  res.render("products/edit", { product });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  await product.save();
  res.redirect(`/products/${product.id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).catch((e) => {
    console.log(e);
    res.send("can not found product");
  });
  res.render("products/show", { product });
  // res.render("products/index", { products });
});

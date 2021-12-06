const mongoose = require("mongoose");
const Product = require("./schema/product.schema");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
  console.log("mongoose connection open to database: test");
}

// const p = new Product({
//   name: "grate fruit",
//   price: 1.99,
//   category: "vagetable",
// });
// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const seedProducts = [
  {
    name: "watermelon",
    price: 20.99,
    category: "fruit",
  },
  {
    name: "apple",
    price: 1.99,
    category: "fruit",
  },
  {
    name: "cucumber",
    price: 2.99,
    category: "vagetable",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

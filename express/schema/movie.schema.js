const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
  console.log("mongoose connection open to database: test");
}

const movieSchema = new Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 20 },
  score: { type: Number, min: 1 },
  rate: String,
  categories: { type: [String], default: ["default"] },
  qty: {
    online: { type: Number, min: 0, default: 0 },
    inStore: { type: Number, min: 0, default: 0 },
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL"],
  },
});

movieSchema.methods.greet = function () {
  console.log("hello, hi, hi.");
  console.log(`-from ${this.title}`);
};

const Movie = mongoose.model("Movie", movieSchema);

const findMovie = async () => {
  try {
    const foundMovie = await Movie.findOne({
      title: "hello",
    });
    foundMovie.greet();
  } catch (e) {
    console.log(e);
    console.log("cannot found title...");
  }
};

findMovie();

// const helloWorld = new Movie({ title: "hello", score: 1111, rate: "S" });
// helloWorld.save();

// Movie.insertMany([
//   { title: "hello", score: 1111, rate: "S" },
//   { title: "hello world", score: 1234, rate: "PG" },
//   { title: "hi", score: 1122, rate: "H" },
//   { title: "hello", score: 123, rate: "S" },
//   { title: "hello", score: 1100, rate: "S" },
// ]).then((data) => {
//   console.log("data inserted!");
//   console.log(data);
// });

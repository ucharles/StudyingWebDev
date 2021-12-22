const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
// ↑ 이것 자체가 미들웨어다.
const HttpError = require("./models/http-error");

const app = express();

const uri = "mongodb://localhost:27017/mern-project";

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// 어느 경로에도 해당하지 않는 요청일 때.
app.use((req, res, next) => {
  const error = new HttpError("could not find this route.", 404);
  throw error;
});

// every incoming request
// error handing middleware function
app.use((error, req, res, next) => {
  // 요청에 헤더가 포함되어 있는지 체크함
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(uri)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

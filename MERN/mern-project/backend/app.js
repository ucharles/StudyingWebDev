const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-routes");
// ↑ 이것 자체가 미들웨어다.

const app = express();

app.use("/api/places", placesRoutes);

app.listen(5000);

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const carsRoutes = require("./routes/cars.routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/cars", carsRoutes);

app.listen(3003, () => {
  console.log("Server on 3003");
});

module.exports = app;

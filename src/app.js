const express = require("express");
const carsRoutes = require("./routes/cars.routes");

const app = express();
app.use(express.json());

app.use("/cars", carsRoutes);

app.listen(3003, () => {
  console.log("Server on 3003");
});

module.exports = app;

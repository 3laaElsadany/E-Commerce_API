const express = require("express");
const app = express();
require("dotenv").config({
  path: "./config.env"
})
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const subCategoryRoute = require("./routes/subCategoryRoute")
const brandRoute = require("./routes/brandRoute")
const productRoute = require("./routes/productRoute")

dbConnection();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use("/api/categories", categoryRoute);
app.use("/api/subCategories", subCategoryRoute);
app.use("/api/brands", brandRoute);
app.use("/api/products", productRoute);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400))
})

app.use(globalError)

process.on("unhandledRejection", (err) => {
  console.error(err.message)

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
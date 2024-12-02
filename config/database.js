const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected To DB"))
    .catch(err => console.log(err.message))
}

module.exports = dbConnection;
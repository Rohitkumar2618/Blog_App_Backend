const mongoose = require("mongoose");
require("dotenv").config();

const connectwithDb = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected  successful");
  })
  .catch((error) => {
    console.error("Issue in DB connection:", error.message);
    process.exit(1); // Exit with an error code
  });
};

module.exports = connectwithDb;

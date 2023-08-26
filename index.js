const express = require("express");
const app = express();

// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request body
app.use(express.json());

const blog = require("./routes/blog");

// Incorrect usage of app.use, should be app.use("/api/v1", blog)
app.use("/api/v1", blog);

// Assuming this is the correct path to connect to the database
const connectWithDb = require("./config/database");
connectWithDb();

// start the server
app.listen(PORT, () => {
    console.log(`App is started at port no ${PORT}`);
});

// Corrected the path for the route handler
app.get("/", (req, res) => {
    res.send(`<h1>This is NOT Homepage</h1>`);
});
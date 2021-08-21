require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB, checkConnection } = require("./db/connect");

const port = process.env.PORT || 5000;

const start = () => {
  connectDB();
  app.listen(port, () => console.log(`App runing on port: ${port}`));
};

start();
checkConnection();

require("dotenv").config();
const { connectDB, checkConnection } = require("./db/connect");

const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const start = () => {
  connectDB();
  app.listen(port, () => console.log(`App runing on port: ${port}`));
};

start();
checkConnection();

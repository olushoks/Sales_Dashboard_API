require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB, checkConnection } = require("./db/connect");
const user = require("./routes/user");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", user);

app.use("*", async (req, res) => {
  res.status(404).json({ success: false, msg: "Resource unknown" });
});

const start = () => {
  connectDB();
  app.listen(port, () => console.log(`App runing on port: ${port}`));
};

start();
checkConnection();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error(error);
  }
};

const checkConnection = async () => {
  const mDB = mongoose.connection;

  mDB.on("connected", () => {
    console.log(`DB connected`);
  });

  mDB.on("error", (err) => {
    console.log(err);
  });
};

module.exports = { connectDB, checkConnection };

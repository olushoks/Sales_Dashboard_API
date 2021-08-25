const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleSchema = new Schema({});

module.exports = mongoose.model("Sale", SaleSchema, "sales");

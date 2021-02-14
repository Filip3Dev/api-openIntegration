const mongoose = require("mongoose");
const DealSchema = new mongoose.Schema({
  deals: Array,
  won_count: Number,
  won_values: Number,
}, { timestamps: true });
module.exports = mongoose.model("Deals", DealSchema);

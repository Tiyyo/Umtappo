const mongoose = require("mongoose");

const ratesSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  id: Number,
  media_type: String,
  rate: Number,
});

module.exports = mongoose.model("Rates", ratesSchema);

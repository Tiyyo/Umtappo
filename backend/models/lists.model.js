const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    _id: mongoose.SchemaTypes.ObjectId,
    name: String,
    content: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);

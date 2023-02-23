const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    name: { type: String },
    content: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);

const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    _id: mongoose.SchemaTypes.ObjectId,
    user_id: { type: String, required: true },
    name: String,
    content: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);

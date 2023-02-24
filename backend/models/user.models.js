const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    admin: {
      type: Boolean,
      required: false,
    },
    lists: [{ type: mongoose.SchemaTypes.ObjectId, ref: "List" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Users", userSchema);

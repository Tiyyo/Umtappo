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
    pictures: {
      full: { type: String },
      crop: { type: String },
    },

    lists: [{ type: mongoose.SchemaTypes.ObjectId, ref: "List" }],
    movie_liked: [
      { type: Array },
      { id: { type: String }, media_type: { type: String } },
    ],

    tvshow_liked: [
      { type: Array },
      { id: { type: String }, media_type: { type: String } },
    ],
    rates: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rates" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Users", userSchema);

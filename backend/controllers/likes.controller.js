const Users = require("../models/user.models");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

module.exports.likeMovie = asyncHandler(async (req, res) => {
  const { user_id, media_type, content_id } = req.body;

  let data = { id: content_id, media_type };

  if (!user_id || !media_type || !content_id) {
    res.status(400).send("User id or media type or content id is missing");
    throw new Error("User id or media type or content id is missing");
  }

  if (media_type.toLowerCase() !== "movie") {
    res.status(400).send("media type must be movie");
    throw new Error("media type must be movie");
  }

  const eg = await Users.findOne({ _id: user_id });
  const query = { _id: user_id };
  const update = { $push: { movie_liked: data } };
  const options = { new: true };

  const user = await Users.findOneAndUpdate(query, update, options);

  console.log(eg.movie_liked);
});

module.exports.dislikeMovie = asyncHandler(async (req, res) => {});

module.exports.likeShow = asyncHandler(async (req, res) => {});

module.exports.dislikeShow = asyncHandler(async (req, res) => {});

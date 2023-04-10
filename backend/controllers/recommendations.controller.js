const Users = require("../models/user.models");
const Rates = require("../models/rates.models");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const axios = require("axios");

module.exports.getUserRecommendations = asyncHandler(async (req, res) => {
  const user_id = req.params.userId;

  const genreUrls = [
    "https://api.themoviedb.org/3/genre/tv/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US",
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US",
  ];

  const user = await Users.findById(user_id);

  const userLists = await Users.findById(user_id)
    .populate("lists", ["name", "content"])
    .exec()
    .then((docs) => {
      res.status(200).send({ lists: docs.lists });
    });

  res.json("ok");
});

module.exports.getRandomRecommendations = asyncHandler(async (req, res) => {
  const user_id = req.params.userId;

  res.status(200).send("ok");
});

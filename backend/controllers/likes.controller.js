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

  const matchUser = await Users.findById(user_id);

  const condition = () => {
    let existCondition = matchUser.movie_liked.some((c) =>
      c.some((el) => el.id == content_id)
    );
    return existCondition;
  };

  const isExist = condition();
  const query = { _id: user_id };
  const update = { $push: { movie_liked: data } };
  const options = { new: true };

  if (isExist) {
    res.status(400).send("Media already liked");
    throw new Error("Media already liked");
  } else {
    const user = await Users.findOneAndUpdate(query, update, options).then(() =>
      res.status(200).send("Success")
    );
  }
});

module.exports.dislikeMovie = asyncHandler(async (req, res) => {
  const { user_id, content_id, media_type } = req.body;
  let refType = "movie";

  if (!user_id || !content_id) {
    res.status(400).send("user_id or content_id is missing");
    throw new Error("user_id or content_id is missing");
  }

  if (media_type !== refType) {
    res.status(400).send("Media type be movie");
    throw new Error("Media type must be movie");
  }

  const query = { _id: user_id };
  const update = { $pull: { movie_liked: { id: content_id } } };
  const options = { rawResult: true };

  const user = await Users.findOneAndUpdate(query, update, options).then(
    (e) => {
      if (e.lastErrorObject.updatedExisting) {
        res.status(200).send("content removed");
      } else {
        res.status(400).send("No delete");
      }
    }
  );
});

module.exports.likeShow = asyncHandler(async (req, res) => {
  const { user_id, media_type, content_id } = req.body;

  let data = { id: content_id, media_type };

  if (!user_id || !media_type || !content_id) {
    res.status(400).send("User id or media type or content id is missing");
    throw new Error("User id or media type or content id is missing");
  }

  if (media_type.toLowerCase() !== "tvshow") {
    res.status(400).send("media type must be Tv show");
    throw new Error("media type must be Tv show");
  }

  const matchUser = await Users.findById(user_id);

  const condition = () => {
    let existCondition = matchUser.tvshow_liked.some((c) =>
      c.some((el) => el.id == content_id)
    );
    return existCondition;
  };

  const isExist = condition();
  const query = { _id: user_id };
  const update = { $push: { tvshow_liked: data } };
  const options = { new: true };

  if (isExist) {
    res.status(400).send("Media already liked");
    throw new Error("Media already liked");
  } else {
    const user = await Users.findOneAndUpdate(query, update, options).then(() =>
      res.status(200).send("Success")
    );
  }
});

module.exports.dislikeShow = asyncHandler(async (req, res) => {
  const { user_id, content_id, media_type } = req.body;
  let refType = "tvshow";

  if (!user_id || !content_id) {
    res.status(400).send("user_id or content_id is missing");
    throw new Error("user_id or content_id is missing");
  }

  if (media_type !== refType) {
    res.status(400).send("Media type be tvshow");
    throw new Error("Media type must be tvshow");
  }

  const query = { _id: user_id };
  const update = { $pull: { tvshow_liked: { id: content_id } } };
  const options = { rawResult: true };

  const user = await Users.findOneAndUpdate(query, update, options).then(
    (e) => {
      if (e.lastErrorObject.updatedExisting) {
        res.status(200).send("content removed");
      } else {
        res.status(400).send("No delete");
        throw new Error("Nothing has been updated");
      }
    }
  );
});

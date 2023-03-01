const express = require("express");

const {
  likeMovie,
  dislikeMovie,
  likeShow,
  dislikeShow,
} = require("../controllers/likes.controller");

const router = express.Router();

router.post("/", likeMovie);
router.patch("/", dislikeMovie);
router.post("/", likeShow);
router.patch("/", dislikeShow);

module.exports = router;

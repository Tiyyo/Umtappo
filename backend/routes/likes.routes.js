const express = require("express");

const {
  likeMovie,
  dislikeMovie,
  likeShow,
  dislikeShow,
} = require("../controllers/likes.controller");

const router = express.Router();

router.post("/movie", likeMovie);
router.patch("/movie", dislikeMovie);
router.post("/show", likeShow);
router.patch("/show", dislikeShow);

module.exports = router;

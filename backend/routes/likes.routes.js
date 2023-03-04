const express = require("express");

const {
  likeMovie,
  dislikeMovie,
  likeShow,
  dislikeShow,
  getMoviesLiked,
  getTvshowsLiked,
} = require("../controllers/likes.controller");

const router = express.Router();

router.get("/movie/:id", getMoviesLiked);
router.post("/movie", likeMovie);
router.patch("/movie", dislikeMovie);
router.get("/tvshow/:id", getTvshowsLiked);
router.post("/tvshow", likeShow);
router.patch("/tvshow", dislikeShow);

module.exports = router;

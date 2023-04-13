const express = require("express");

const {
  getRandomRecommendations,
  getUserRecommendations,
} = require("../controllers/recommendations.controller");
const router = express.Router();

router.get("/genre/random", getRandomRecommendations);
router.get("/genre/:userId", getUserRecommendations);

module.exports = router;

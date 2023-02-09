const express = require("express");
const {
  createUser,
  loginUser,
  currentUser,
} = require("../controllers/user.controller");
const { validateToken } = require("../controllers/JWT");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;

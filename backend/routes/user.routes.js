const express = require("express");
const {
  createUser,
  loginUser,
  currentUser,
  patchUsername,
  patchEmail,
  patchPassword,
  getUserInfos,
} = require("../controllers/user.controller");
const { validateToken } = require("../controllers/JWT");
const router = express.Router();

router.post("/register", createUser);
router.patch("/username", patchUsername);
router.patch("/email", patchEmail);
router.patch("/password", patchPassword);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.get("/:id", getUserInfos);

module.exports = router;

const express = require("express");
const {
  createUser,
  loginUser,
  currentUser,
  createList,
  getLists,
} = require("../controllers/user.controller");
const { validateToken } = require("../controllers/JWT");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.post("/create_list", createList);
router.get("/get_list", getLists);

module.exports = router;

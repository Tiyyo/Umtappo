const express = require("express");

const {
  createList,
  getLists,
  addContent,
  deleteList,
  deleteContent,
} = require("../controllers/list.controller");
const router = express.Router();
router.post("/", createList);
router.post("/get", getLists);
router.put("/", addContent);
router.delete("/:id", deleteList);
router.patch("/", deleteContent);

module.exports = router;

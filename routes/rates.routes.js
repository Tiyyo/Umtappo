const express = require("express");
const {
  addRates,
  removeRates,
  getRates,
  editRates,
} = require("../controllers/rates.controller");
const router = express.Router();

//console.log('ok')

router.post("/add", addRates);
router.get("/get/:user_id", getRates);
router.patch("/remove", removeRates);
router.patch("/edit", editRates);

module.exports = router;

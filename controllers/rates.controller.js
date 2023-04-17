const Users = require("../models/user.models");
const Rates = require("../models/rates.models");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

module.exports.addRates = asyncHandler(async (req, res) => {
  const { userRate, id, user_id, media_type } = req.body;

  if (!userRate || !id || !user_id || !media_type) {
    res.status(400).send("Rate, Id, User_id or media_type is missing");
    throw new Error("Rate, Id, User_id or media_type is missing");
  }

  if (!isValidObjectId(user_id)) {
    res.status(400).send("Please provide a correct Object Id");
  }

  const user = await Users.findById(user_id);

  if (!user) {
    res.status(400).send("User not found");
    throw new Error("User not found");
  }

  const userRates = await Users.findById(user_id)
    .populate("rates", ["_id", "id", "media_type", "rate"])
    .exec()
    .then((docs) => docs);

  if (userRates) {
    userRates.rates.map((el) => {
      if (el.id === id && el.media_type === media_type) {
        res
          .status(400)
          .send("Grade already in database , you need to use edit rate");
        return;
      }
    });
  }

  const rate = new Rates({
    _id: new mongoose.Types.ObjectId(),
    id,
    rate: userRate,
    media_type,
  });
  rate.save();

  if (!user) {
    res.status(400).send("User not found");
    throw new Error("User not found");
  } else {
    const query = { _id: user_id };
    const update = {
      $push: {
        rates: rate,
      },
    };
    const options = { rawResult: true };
    await Users.findOneAndUpdate(query, update, options).then((e) => {
      console.log(e);
      if (e.lastErrorObject.updatedExisting) {
        res.status(200).send({ _id: rate._id });
      }
    });
  }
});

module.exports.removeRates = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    res.status(400).send("Rate _id is missing");
    throw new Error("Rate _id is missing");
  }

  await Rates.findByIdAndDelete(_id).then(() =>
    res.status(200).send("rate remove")
  );
});

module.exports.getRates = asyncHandler(async (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
    res.status(400).send("No user_id is provided");
  }

  if (!isValidObjectId(user_id)) {
    res.status(400).send("Please provide a correct Object Id");
  }

  const user = await Users.findById(user_id);

  const userRates = await Users.findById(user_id)
    .populate("rates", ["_id", "id", "media_type", "rate"])
    .exec()
    .then((docs) => res.status(200).send({ rates: docs.rates }));
});
module.exports.editRates = asyncHandler(async (req, res) => {
  const { _id, newRate } = req.body;

  if (!_id || !newRate) {
    res.status(400).send("rate _id or new rate is missing");
  }

  const query = { _id: _id };
  const update = {
    rate: newRate,
  };

  const options = { new: true, rawResult: true };

  const rate = await Rates.findOneAndUpdate(query, update, options).then(
    (result) => {
      console.log(result.value.rate, newRate);

      if (result.value.rate == newRate) {
        res.status(200).send("rate has been updated");
      } else {
        res.status(400).send("something goes wrong try again");
      }
    }
  );
});

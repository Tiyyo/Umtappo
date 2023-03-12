const Users = require("../models/user.models");
const List = require("../models/lists.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModels = require("../models/user.models");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { createTokens } = require("./JWT");
const { default: mongoose } = require("mongoose");
//@desc Register a User
//@route POST /user/register
//@acces public

module.exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send("All fileds are required");
    throw new Error("All fields are required ! ");
  }

  const userAvailable = await Users.findOne({ email });
  if (userAvailable) {
    res.status(400).send("User already registered ! PLease Login");
    throw new Error("User already registered ! PLease Login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password : ", hashedPassword);

  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(200)
      .send("User registerd")
      .json({ _id: user.id, email: user.email })
      .send("User registerd");
    res.json({ message: "User registerd" });
  } else {
    res.status(400).send("User data is not valid");
    throw new Error("User data is not valid");
  }
});

//@desc Login User
//@route POST /user/login
//@acces public

module.exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("All fields are required");
    throw new Error("All fileds are required");
  }
  const user = await Users.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = createTokens(user);
    res.status(200).json({ accessToken });
  } else {
    res.status(401).send("Email or Password is not valid");
    throw new Error("Email or Password is not valid");
  }

  // res.json({ message: "User Logged IN" });
});

//@desc Current user info
//@route POST/ user/current
//@acees private

module.exports.currentUser = asyncHandler(async (req, res) => {
  let email = req.user.email;
  const user = await Users.findOne({ email });
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
  });
});

//@desc Current user info
//@route PATCH user/username
//@acees public
module.exports.patchUsername = asyncHandler(async (req, res) => {
  const { newUsername, user_id } = req.body;

  if (!newUsername || !user_id) {
    res.status(400).send("a new username or an user id is missing");
    throw new Error("a new username or an user id is missing");
  }

  if (newUsername.length < 4 || newUsername.length > 20) {
    res
      .status(400)
      .send(
        "New Username should be 4 characters minimum and 20 characters maximun"
      );
    throw new Error(
      "New Username should be 4 characters minimum and 20 characters maximun"
    );
  }
  const user = await Users.findById(user_id);
  const query = { _id: user_id };
  const update = { $set: { username: newUsername } };
  const options = { new: true, rawResult: true };

  if (!user) {
    res.status(400).send("No user found");
    throw new Error('No user found"');
  } else {
    const result = await Users.findOneAndUpdate(query, update, options).then(
      (e) => {
        if (e.lastErrorObject.updatedExisting) {
          res.status(200).send("Username has been updated");
        } else {
          res.status(400).send("Something goes wrong");
        }
      }
    );
  }
});

module.exports.patchEmail = asyncHandler(async (req, res) => {
  const { newEmail, user_id } = req.body;

  if (!newEmail || !user_id) {
    res.status(400).send("New Email or user_id is missing");
    throw new Error("New Email or user_id is missing");
  }

  const isExistEmail = await Users.findOne({ email: newEmail });

  if (isExistEmail) {
    res.status(401).send("This email is already taken");
    throw new Error("This email is already taken");
  }

  const user = await Users.findById(user_id);

  const query = { _id: user_id };
  const update = { $set: { email: newEmail } };
  const options = { rawResult: true };

  if (!user) {
    res.status(400).send("No User found");
    throw new Error("No User found");
  } else {
    const result = await Users.findOneAndUpdate(query, update, options).then(
      (e) => {
        if (e.lastErrorObject.updatedExisting) {
          res.status(200).send("Email has been updated");
          console.log(e);
        } else {
          res.status(400).send("Something goes wrong");
        }
      }
    );
  }
});

module.exports.patchPassword = asyncHandler(async (req, res) => {
  const { user_id, newPassword, password } = req.body;

  console.log(password, newPassword);

  if (!user_id || !newPassword || !password) {
    res.status(400).send("User id, newPassword or password is missing");
    throw new Error("User id, newPassword or password is missing");
  }

  const user = await Users.findById(user_id);

  if (!user) {
    res.status(400).send("User id not found in database");
  }

  console.log(user.password);

  const matchPassword = await bcrypt.compare(password, user.password);

  console.log(matchPassword);

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  const query = { _id: user_id };
  const update = { $set: { password: newHashedPassword } };
  const options = { rawResult: true };

  if (matchPassword) {
    const result = await Users.findOneAndUpdate(query, update, options).then(
      (e) => {
        if (e.lastErrorObject.updatedExisting) {
          res.status(200).send("Password has been updated");
        } else {
          res.status(400).send("Something goes wrong");
        }
      }
    );
  } else {
    res.status(401).send("Passwords doesn't match");
  }
});

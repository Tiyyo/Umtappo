const Users = require("../models/user.models");
const List = require("../models/lists.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModels = require("../models/user.models");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { createTokens } = require("./JWT");
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

module.exports.createList = asyncHandler(async (req, res) => {
  const { name, content, email } = req.body;

  if (!name && !content) {
    res.status(400).send("You need to send a name and one content");
  }

  try {
    const list = await List.create({ name, content });
    const user = await Users.findOneAndUpdate(
      { email },
      {
        $push: {
          lists: list,
        },
      }
    );
    console.log(user);
    res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    res.status(400).send("No user found and failed to push data");
  }
});

module.exports.getLists = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userLists = await Users.findOne({ email }).populate("list");

  res.status(200).send({ userLists });
});

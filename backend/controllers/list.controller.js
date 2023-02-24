const Users = require("../models/user.models");
const List = require("../models/lists.model");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

module.exports.createList = asyncHandler(async (req, res) => {
  const { name, content, email, user_id } = req.body;

  if (!name && !content) {
    res.status(400).send("You need to send a name and one content");
  }

  if (!user_id) {
    res.status(400).send("user_id is missing");
  }
  const list = new List({
    name: name,
    content: content,
    _id: new mongoose.Types.ObjectId(),
    user_id: user_id,
  });
  list.save();

  console.log(user_id);
  const user = Users.findById(user_id);
  console.log(user);

  await Users.findOneAndUpdate(
    { email },
    {
      $push: {
        lists: list,
      },
    }
  )
    .exec()
    .then((docs) => console.log(docs))
    .catch((err) => console.log(err));

  res.status(200).json({ list: list });
});

module.exports.getLists = asyncHandler(async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    res.status(400).send("No user_id is provided");
  }

  const user = await Users.findById(user_id);
  console.log(user);

  const userLists = await Users.findById(user_id)
    .populate("lists", ["name", "content"])
    .exec()
    .then((docs) => {
      console.log(docs);
      res.json(docs.lists);
    });

  res.status(200).send({ userLists });
});

module.exports.deleteList = asyncHandler(async (req, res) => {
  const { user_id, name } = req.body;
  if (!user_id) {
    res.status(400).send("An User ID is mandatory");
  }
  if (!name) {
    res.status(400).send("Name is required");
  }

  //   console.log(list);

  await List.deleteOne({ name, user_id });

  const list = await List.findOne({ name, user_id });
  if (list) {
    res.status(400).send("Wrong name or user_id");
  } else {
    res.status(200).send("list removed from the databsae");
  }
});

module.exports.addContent = asyncHandler(async (req, res) => {
  const { user_id, name, content } = req.body;
  if (!user_id) {
    res.status(400).send("An User ID is mandatory");
  }
  if (!name) {
    res.status(400).send("Name is required");
  }
  if (!content) {
    res
      .status(400)
      .send("You are trying to add content but you aren't sending anything");
  }
  const list = await List.findOne({ user_id, name });
  if (!list) {
    res.status(400).send("Wrong user_id or name");
  }
  const contents = list.content;

  contents.forEach((element) => {
    if (element === content) {
      res.status(400).send("Already inclued in this list");
    }
  });

  list
    .updateOne({ $push: { content: content } })
    .exec()
    .then((docs) => {
      if (docs) {
        res.status(200).send("Succesfully added");
      } else {
        res.status(400).send("Something went wrong");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(contents);
});

module.exports.deleteContent = asyncHandler(async (req, res) => {
  const { name, user_id, content } = req.body;

  if (!user_id) {
    res.status(400).send("An User ID is mandatory");
  }
  if (!name) {
    res.status(400).send("Name is required");
  }
  if (!content) {
    res
      .status(400)
      .send("You are trying to delete content but you aren't sending anything");
  }

  const list = await List.findOneAndUpdate(
    { name, user_id },
    {
      $pull: {
        content: content,
      },
    }
  )
    .exec()
    .then((docs) => {
      docs.content.forEach((el) => {
        if (el === content) {
          res.status(400).send("element is not deleted");
        } else {
          res.status(200).send("Succesfully remove");
        }
      });
    })
    .catch((err) => console.log(err));
});

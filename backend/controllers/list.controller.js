const Users = require("../models/user.models");
const List = require("../models/lists.model");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

module.exports.createList = asyncHandler(async (req, res) => {
  const { name, content, user_id } = req.body;

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

  const user = Users.findById(user_id);
  if (!user) {
    res.status(404).send("User ID doesn't match wih any users");
  }

  await Users.findOneAndUpdate(
    { _id: user_id },
    {
      $push: {
        lists: list,
      },
    }
  )
    .exec()
    .then((docs) => console.log(docs))
    .catch((err) => console.log(err));

  res.status(201).json({ list: list });
});

module.exports.getLists = asyncHandler(async (req, res) => {
  const user_id = req.params.id;

  if (!user_id) {
    res.status(400).send("No user_id is provided");
  }

  const user = await Users.findById(user_id);

  const userLists = await Users.findById(user_id)
    .populate("lists", ["name", "content"])
    .exec()
    .then((docs) => {
      res.status(200).send({ lists: docs.lists });
    });
});

module.exports.deleteList = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("An User ID is mandatory");
  }
  const list = await List.findById(id);
  if (!list) {
    res.status(404).send("Id doesn't match with any list");
  }

  await List.deleteOne({ _id: id });

  const deletedList = await List.findOne({ _id: id });
  if (deletedList) {
    res.status(400).send("Wrong name or user_id");
  } else {
    res.status(200).send("list removed from the databsae");
  }
});

module.exports.addContent = asyncHandler(async (req, res) => {
  const { listId, content, content_id } = req.body;

  if (!listId) {
    res.status(400).send("a List ID is mandatory");
  }

  if (!content) {
    res
      .status(400)
      .send("You are trying to add content but you aren't sending anything");
  }

  const list = await List.findById(listId);
  if (!list) {
    res.status(400).send("Wrong list id");
  }

  let matchId = parseInt(content_id);

  const condition = () => {
    let existCondition = list.content.some((c) => c.id === matchId);
    return existCondition;
  };

  const isExist = condition();

  if (isExist) {
    res.status(422).send("Already added to this lists");
  } else {
    list
      .updateOne({ $push: { content: content } })
      .then((docs) => {
        res.status(200).send("Succesfully added");
      })

      .catch((err) => {
        console.log(err);
      });
  }
  // }
});

module.exports.deleteContent = asyncHandler(async (req, res) => {
  const { list_id, content_id } = req.body;

  if (!list_id) {
    res.status(400).send("A list ID is mandatory");
  }

  if (!content_id) {
    res.status(400).send("content id is missing");
  }

  let matchId = parseInt(content_id);

  const list = await List.findOneAndUpdate(
    { _id: list_id },
    {
      $pull: {
        content: {
          id: matchId,
        },
      },
    }
  );

  const updateList = await List.findById(list_id);

  if (list === updateList) {
    res.status(400).send("Something goes wrong");
  } else {
    res.status(200).send("item removed");
  }
});

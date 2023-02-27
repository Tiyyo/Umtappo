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
    { user_id },
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
      console.log(docs);
      res.json(docs.lists);
    });

  res.status(200).send({ userLists });
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

  const existent = await List.find(
    { _id: listId },
    { $elemMatch: { content: { id: matchId } } }
  );

  // if (existent) {
  //   res.status(422).send("Already inclued in this list");
  // }
  // {
  //   list
  //     .updateOne({ $push: { content: content } })
  //     .then((docs) => {
  //       if (docs) {
  //         res.status(200).send("Succesfully added");
  //       } else {
  //         res.status(400).send("Something went wrong");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
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
    { name: "allo" },
    {
      $pull: {
        content: {
          id: matchId,
        },
      },
    }
  );

  // console.log(result);
  const updateList = await List.findById(list_id);

  if (list === updateList) {
    res.status(400).send("Something goes wrong");
  } else {
    res.status(200).send("item removed");
  }

  // const list = await List.findById(list_id);
  // if (list) {
  //   res.send("list exist");
  // } else {
  //   res.send("there is no list matching this list_id");
  // }

  // let contents = list.content;

  // not working
  // contents.forEach((content) => {
  //   console.log(content.id);
  //   console.log(content_id);
  //   if (content.id === content_id) {
  //     content.remove();
  //     res.send("content supressed");
  //   }
  // });

  // const data = await List.findById(list_id);
  // console.log(data.content);

  // data.content.forEach((element) => {
  //   console.log(element.id, content_id);
  // });
  // const list = await List.findOneAndUpdate(
  //   { list_id },
  //   {
  //     $pull: {
  //       content: { id: content_id },
  //     },
  //   }
  // )
  //   .exec()
  //   // .then((docs) => {
  //   //   docs.content.forEach((el) => {
  //   //     if (el === content) {
  //   //       res.status(400).send("element is not deleted");
  //   //     } else {
  //   //       res.status(200).send("Succesfully remove");
  //   //     }
  //   //   });
  //   // })
  //   .catch((err) => console.log(err));
});

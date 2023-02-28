import React from "react";

const Filter = () => {
  const item1 = { name: "item1 ", id: "10" };
  const item2 = { name: "item2 ", id: "11" };
  const item3 = { name: "item3 ", id: "12" };
  const item4 = { name: "item4 ", id: "13" };
  const item5 = { name: "item5 ", id: "14" };
  const item6 = { name: "item6 ", id: "15" };
  const item7 = { name: "item7 ", id: "16" };
  const item8 = { name: "item8 ", id: "17" };

  const list1 = {
    name: "First List",
    id: "1",
    content: [item1, item2, item3, item4],
  };

  const list2 = {
    name: "Second List",
    id: "2",
    content: [item5, item6, item7, item8],
  };

  const state = [list1, list2];

  const itemName = "item2";
  const listname = "First list";

  const removeItem = (data, listId, contentId) => {
    // data.map((list) =>
    //   list.id != listId
    //     ? list
    //     : {
    //         ...list,
    //         content: list.content.filter(({ id }) => id != contentId),
    //       }
    // );
  };

  const filter = state.map((list) => {
    return list.id != 1
      ? list
      : { ...list, content: list.content.filter((el) => el.id != 12) };
  });

  return <div className="app">{console.log(filter)}</div>;
};

export default Filter;

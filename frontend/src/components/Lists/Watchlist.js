import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import ItemList from "./ItemList/ItemList";

const Watchlist = () => {
  const {
    state: {
      list: { name, _id: listID },
      typeList,
    },
  } = useLocation();

  const content = useSelector((state) => {
    if (typeList === "whatchlist") {
      let data = state.lists.lists;
      let index = data.findIndex((list) => list._id === listID);
      return data[index].content;
    } else if ((typeList === "like") & (listID === "1")) {
      return state.movieLiked.fetchMedia;
    } else if ((typeList === "like") & (listID === "2")) {
      return state.tvshowLiked.fetchMedia;
    }
  });

  return (
    <div className="list-container">
      <div className="list-container__main">
        {content?.map((content) => (
          <ItemList
            key={content.id}
            content={content}
            listID={listID}
            typeList={typeList}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;

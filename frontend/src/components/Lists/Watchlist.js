import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import AppContext from "../../utils/Context/AppContextProvider";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList/ItemList";
import HeaderResume from "./HeaderResume";
import { motion } from "framer-motion";

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
      console.log(state.tvshowLiked.loading);
      return state.tvshowLiked.fetchMedia;
    }
  });

  const { config } = useContext(AppContext);

  const { header_resume } = useSelector((state) => state.header_resume);

  const dispatch = useDispatch();

  const pathImage = (hoveredEl, int) => {
    return Object.keys(header_resume).length === 0
      ? config.base_url + config.poster_sizes[int] + content[0]?.poster_path
      : config.base_url + config.poster_sizes[int] + hoveredEl?.poster_path;
  };

  // const header = () => {
  //   return Object.keys(header_resume).length === 0 ? (
  //     <HeaderResume content={content[0]} typeList={typeList} />
  //   ) : (
  //     <HeaderResume content={header_resume} typeList={typeList} />
  //   );
  // };

  return (
    <div className="list-container">
      {/* <div className="list-container__header">
        <div className="list-container__header__top-section">
          <h2 className="list-container__header__top-section__list-name">
            {name}
          </h2>
        </div>
        <div className="list-container__header__main-section">
          <div className="list-container__header--image">
            <img
              src={pathImage(header_resume, 1)}
              alt="poster of current hover content"
            />
          </div>
          <div className="list-container__header__infos">
            <div className="list-container__header__infos--content">
              {header()}
            </div>
          </div>
        </div>
      </div> */}

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

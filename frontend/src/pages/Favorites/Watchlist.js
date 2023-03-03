import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import AppContext from "../../utils/Context/AppContextProvider";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteContent } from "../../features/watchlists/Slice/lists";
import ItemList from "../../components/Lists/ItemList";
import HeaderResume from "../../components/Lists/HeaderResume";
import { motion } from "framer-motion";

const Watchlist = (props) => {
  const {
    state: {
      list: { content: lists, name, _id: listID },
    },
  } = useLocation();

  const contents = useSelector((state) => {
    let data = state.lists.lists;
    let index = data.findIndex((list) => list._id == listID);
    return data[index].content;
  });

  const { config } = useContext(AppContext);

  const dispatch = useDispatch();

  const { header_resume } = useSelector((state) => state.header_resume);

  const carousel = useRef();

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (carousel?.current) {
      setHeight(carousel.current.scrollHeight - carousel.current.offsetHeight);
    }
  });

  const pathImage = (content, int) => {
    return header_resume
      ? config.base_url + config.poster_sizes[int] + content.poster_path
      : config.base_url + config.poster_sizes[int] + lists[0].poster_path;
  };

  const removeContent = (contentId) => {
    axios.patch("http://localhost:5000/list", {
      list_id: listID,
      content_id: contentId,
    });
    dispatch(deleteContent({ listID, contentId }));
  };

  return (
    <div className="list-container">
      <div className="list-container__header">
        <h2 className="list-container__header--list-name">{name}</h2>
        <div className="list-container__header--image">
          <img
            src={pathImage(header_resume, 0)}
            alt="poster of current hover content"
          />
        </div>
        <div className="list-container__header__infos">
          <div className="list-container__header__infos--content">
            {header_resume ? (
              <HeaderResume content={header_resume} />
            ) : (
              <HeaderResume content={lists[0]} />
            )}
          </div>
        </div>
      </div>
      <div className="list-container__main">
        <motion.div
          className="outer-vertical-carousel"
          ref={carousel}
          whiletap={{ cursor: "grabbing" }}
        >
          <motion.div
            className="vertical-carousel"
            drag="y"
            dragConstraints={{ top: 0, bottom: -height }}
          >
            {contents?.map((content) => (
              <ItemList key={content.id} content={content} listID={listID} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Watchlist;

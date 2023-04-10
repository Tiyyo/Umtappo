import React, { useContext, useState } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import DeleteItem from "./DeleteItem";
import AddContentOpen from "./AddContentOpen";
import MediaType from "./MediaType";
import { displayReleaseYear } from "../../../utils/function/display.realease.year";
import { imagePath } from "../../../utils/function/image.path";
import AppContext from "../../../utils/Context/AppContextProvider";
import LazyLoad from "react-lazy-load";

const ItemList = ({ content, listID, typeList }) => {
  const { config } = useContext(AppContext);
  const [openList, setOpenList] = useState(false);

  const handleClick = () => {
    setOpenList(!openList);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="item-list"
        transition={{ layout: { duration: 0.3, type: spring } }}
        exit={{ opacity: 0 }}
        layout
        data-position={openList ? "open" : "close"}
        onClick={handleClick}
        style={{ borderRadius: "1em" }}
      >
        <motion.div
          className="item-list__wrapper"
          data-position={openList ? "open" : "close"}
        >
          <motion.div
            layout="position"
            className="item-list__wrapper__image"
            data-position={openList ? "open" : "close"}
          >
            <LazyLoad>
              <img
                src={imagePath(config, "logo", content, 3)}
                alt="logo film"
              />
            </LazyLoad>
          </motion.div>

          <div
            className="item-list__wrapper__infos"
            data-position={openList ? "open" : "close"}
          >
            <div
              className="item-list__wrapper__infos__title"
              data-position={openList ? "open" : "close"}
            >
              {content.title || content.name}
            </div>
            <AddContentOpen
              content={content}
              openList={openList}
              typeList={typeList}
            />
            <div className="item-list__wrapper__infos__attributes">
              <span className="item-list__wrapper__infos__attributes__type">
                <MediaType content={content} />
              </span>
              <span> </span>
              <span className="item-list__wrapper__infos__attributes__year">
                {displayReleaseYear(content)}
              </span>
            </div>
          </div>
          <DeleteItem
            conetnt={content}
            openList={openList}
            typeList={typeList}
            listID={listID}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemList;

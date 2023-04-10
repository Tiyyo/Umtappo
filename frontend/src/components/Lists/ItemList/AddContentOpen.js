import React, { useContext } from "react";
import { displayLikedMediaGenre } from "./display.media.like.genre";
import AppContext from "../../../utils/Context/AppContextProvider";
import { motion, AnimatePresence } from "framer-motion";

const AddContentOpen = ({ content, openList, typeList }) => {
  const { genreListTV, genreListMovie } = useContext(AppContext);
  return (
    <AnimatePresence>
      {openList && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, y: 0, transform: "sclae(0)" }}
          layout="position"
        >
          <div className="item-list__wrapper__infos__overview">
            {content.overview}
          </div>
          <div className="item-list__wrapper__infos__genres">
            {displayLikedMediaGenre(
              typeList,
              content,
              genreListMovie,
              genreListTV
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddContentOpen;

import React, { useCallback, useContext, useMemo, useState } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import LoaderUI from "../Loader/LoaderUI";

const SmallCard = (props) => {
  const {
    list: { content, name, id },
  } = props;

  const { config } = useContext(AppContext);

  const filterContent = content?.filter((c) => c.poster_path);

  let numOfContentPoster = filterContent?.length - 1;
  let randomNum = Math.floor(Math.random() * numOfContentPoster);
  let sizePoster = 0;

  const posterImage = useCallback(
    (sizePoster, content) => {
      return (
        config.base_url +
        config.poster_sizes[sizePoster] +
        content[randomNum].poster_path
      );
    },
    [content]
  );

  return (
    <div className="small-card">
      <div className="small-card__poster">
        {!content ? (
          <LoaderUI />
        ) : (
          <img
            src={posterImage(sizePoster, content)}
            alt={"poster of " + name + " list"}
          />
        )}
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default SmallCard;

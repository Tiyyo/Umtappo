import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";

const SmallCard = (props) => {
  const {
    list: { content, name, id },
  } = props;

  const { config } = useContext(AppContext);

  const filterContent = content.filter((c) => c.poster_path);

  let numOfContentPoster = filterContent.length - 1;

  let randomNum = Math.floor(Math.random() * numOfContentPoster);

  let sizePoster = 0;

  const pathPosterImage = (sizePoster, content) => {
    return (
      config.base_url +
      config.poster_sizes[sizePoster] +
      content[randomNum].poster_path
    );
  };
  return (
    <div>
      <img src={pathPosterImage(sizePoster, content)} />
    </div>
  );
};

export default SmallCard;

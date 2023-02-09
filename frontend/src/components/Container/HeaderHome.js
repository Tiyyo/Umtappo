import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import HomeContext from "../../utils/Context/HomeContextProvider";
import useWindowSize from "../../utils/useWindowSize";

const HeaderHome = (props) => {
  const { config } = useContext(AppContext);
  const { setImageHeaderHeight } = useContext(HomeContext);
  const { content } = props;

  const [posterToDisplay, setPosterToDisplay] = useState(1);
  const image = useRef();
  const windowSize = useWindowSize();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setImageHeaderHeight(entry.target.clientHeight);
    });
    observer.observe(image.current);
  }, [image, windowSize, setImageHeaderHeight]);

  useEffect(() => {
    const changeImage = setInterval(() => {
      setPosterToDisplay(Math.floor(Math.random() * 19));
    }, 7500);
    return () => clearInterval(changeImage);
  }, []);

  return (
    <div className="home-image">
      <img
        src={
          config.base_url +
          config.poster_sizes[4] +
          content[posterToDisplay].poster_path
        }
        alt="poster"
        ref={image}
      />
    </div>
  );
};

export default HeaderHome;

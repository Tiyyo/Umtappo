import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";
import HomeContext from "../../../utils/Context/HomeContextProvider";
import useWindowSize from "../../../utils/hooks/useWindowSize";

const HeaderHome = ({ content }) => {
  const { config } = useContext(AppContext);
  const { setImageHeaderHeight } = useContext(HomeContext);

  const [posterToDisplay, setPosterToDisplay] = useState(1);
  const image = useRef();
  const windowSize = useWindowSize();
  let numberOfContent = 19;
  let delayBetweenContent = 7500; // time in ms

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setImageHeaderHeight(entry.target.clientHeight);
    });
    observer.observe(image.current);
  }, [image, windowSize, setImageHeaderHeight]);

  useEffect(() => {
    const changeImage = setInterval(() => {
      setPosterToDisplay(Math.floor(Math.random() * numberOfContent));
    }, delayBetweenContent);
    return () => clearInterval(changeImage);
  }, [numberOfContent, delayBetweenContent]);

  return (
    <div className="header-home">
      <img
        src={
          config?.base_url +
          config?.poster_sizes[4] +
          content[posterToDisplay]?.poster_path
        }
        alt="poster"
        ref={image}
      />
    </div>
  );
};

export default HeaderHome;

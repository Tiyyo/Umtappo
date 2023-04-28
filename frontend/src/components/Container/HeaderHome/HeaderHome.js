import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";
import HomeContext from "../../../utils/Context/HomeContextProvider";
import useWindowSize from "../../../utils/hooks/useWindowSize";

const HeaderHome = React.forwardRef(({ content }, headerHome) => {
  const { config } = useContext(AppContext);
  const { setImageHeaderHeight } = useContext(HomeContext);

  const [posterToDisplay, setPosterToDisplay] = useState(1);
  const image = useRef();
  const windowSize = useWindowSize();
  let numberOfContent = 19;
  let delayBetweenContent = 7500; // time in ms

  const imagePathPoster = (int) => {
    return (
      config?.base_url +
      config?.poster_sizes[int] +
      content[posterToDisplay]?.poster_path
    );
  };

  const imagePathBanner = (int) => {
    return (
      config?.base_url +
      config?.backdrop_sizes[int] +
      content[posterToDisplay]?.backdrop_path
    );
  };

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
    <div className="header-home" ref={headerHome}>
      <div className="header-home__image-wrapper">
        <picture>
          <source
            srcSet={
              imagePathPoster(3).slice(0, 4) + "s" + imagePathPoster(3).slice(4)
            }
            media="(max-width : 320px)"
          />
          <source
            srcSet={
              imagePathPoster(4).slice(0, 4) + "s" + imagePathPoster(4).slice(4)
            }
            media="(max-width : 480px)"
          />
          <source
            srcSet={
              imagePathPoster(5).slice(0, 4) + "s" + imagePathPoster(5).slice(4)
            }
            media="(max-width : 768px)"
          />
          <source
            srcSet={
              imagePathPoster(6).slice(0, 4) + "s" + imagePathPoster(6).slice(4)
            }
            media="(max-width : 960px)"
          />
          <source
            srcSet={
              imagePathBanner(2).slice(0, 4) + "s" + imagePathBanner(2).slice(4)
            }
            media="(max-width : 1200px)"
          />
          <source
            srcSet={
              imagePathBanner(2).slice(0, 4) + "s" + imagePathBanner(2).slice(4)
            }
            media="(max-width : 1600px)"
          />
          <img
            src={
              imagePathBanner(3).slice(0, 4) + "s" + imagePathBanner(3).slice(4)
            }
            alt="On air Movies "
            ref={image}
          />
        </picture>
      </div>
    </div>
  );
});

export default HeaderHome;

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
        {/* <img src={imagePathPoster(4)} alt="poster" ref={image} /> */}

        <picture>
          <source srcSet={imagePathPoster(3)} media="(max-width : 320px)" />
          <source srcSet={imagePathPoster(4)} media="(max-width : 480px)" />
          <source srcSet={imagePathPoster(5)} media="(max-width : 768px)" />
          <source srcSet={imagePathPoster(6)} media="(max-width : 960px)" />
          <source srcSet={imagePathBanner(2)} media="(max-width : 1200px)" />
          <source srcSet={imagePathBanner(2)} media="(max-width : 1600px)" />
          <img src={imagePathBanner(3)} ref={image} />
        </picture>
      </div>
      {/* <picture ref={image}> */}
      {/* <source
            type="image/avif"
            srcSet={
              config?.base_url +
              config?.poster_sizes[4] +
              content[posterToDisplay]?.poster_path
            }
            sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px"
          /> */}
      {/* <source
          type="image/jpeg"
          srcSet={
            config?.base_url +
            config?.poster_sizes[4] +
            content[posterToDisplay]?.poster_path
          }
          // sizes="(max-width: 300px) 300px, "
        /> */}
      {/* <img src={imagePathPoster(4)} />
      </picture> */}
    </div>
  );
});

export default HeaderHome;

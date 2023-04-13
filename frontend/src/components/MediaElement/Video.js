import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import ReactPlayer from "react-player";
import { imagePath } from "../../utils/function/image.path";

const Video = ({ content, videos, loading }) => {
  const { config } = useContext(AppContext);
  const [ytKey, setYtKey] = useState(null);
  const [contentPresence, setPrescence] = useState(true);

  let videoType = "Trailer";

  const getVideoKey = () => {
    if (!loading) {
      let keys = [];
      videos?.results?.forEach((video) => {
        if (video.type === videoType) {
          keys.push(video.key);
        }
        setYtKey(keys[0]);
      });
    }
  };

  const handleImageBehavior = () => {
    if (ytKey) {
      return (
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=" + ytKey}
          controls
          width="100%"
          height="auto"
          className="player"
        ></ReactPlayer>
      );
    } else {
      if (imagePath(config, "backdrop", content, 1).includes("null")) {
        return;
      } else {
        <img
          src={imagePath(config, "backdrop", content, 1)}
          alt={"poster of " + content.name || content.title}
        />;
      }
    }
  };

  useEffect(() => {
    getVideoKey();
  }, [loading]);

  return (
    <div
      className="modal-content__wrapper__media-element__trailer-container"
      style={contentPresence ? { height: "fit-content" } : { height: "0" }}
    >
      {handleImageBehavior()}
    </div>
  );
};

export default Video;

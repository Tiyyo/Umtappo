import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import ReactPlayer from "react-player";

const Video = (props) => {
  const { content, videos, loading } = props;
  const { config } = useContext(AppContext);
  const [ytKey, setYtKey] = useState(null);
  const [contentPresence, setPrescence] = useState(true);

  let videoType = "Trailer";
  let imagePath =
    config.base_url + config.backdrop_sizes[1] + content.backdrop_path;

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
      if (imagePath) {
        return (
          <img
            src={imagePath}
            alt={"poster of " + content.name || content.title}
          />
        );
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    getVideoKey();
  }, [loading]);

  return (
    <div
      className="media-element__trailer-container"
      style={contentPresence ? { height: "fit-content" } : { height: "0" }}
    >
      {handleImageBehavior()}
    </div>
  );
};

export default Video;

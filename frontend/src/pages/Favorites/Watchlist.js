import React, { useContext } from "react";
import { useLocation } from "react-router";
import AppContext from "../../utils/Context/AppContextProvider";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteContent } from "../../features/watchlists/Slice/lists";

const FavoriteList = (props) => {
  const {
    state: {
      list: { content: lists, name, _id: listID },
    },
  } = useLocation();

  const contents = useSelector((state) => {
    let data = state.lists.lists;
    let index = data.findIndex((list) => list._id == listID);
    return data[index].content;
  });
  console.log(contents);

  const { config } = useContext(AppContext);

  const dispatch = useDispatch();

  const pathLogoImage = (content) => {
    return config.base_url + config.logo_sizes[1] + content.poster_path;
  };

  const removeContent = (contentId) => {
    axios.patch("http://localhost:5000/list", {
      list_id: listID,
      content_id: contentId,
    });
    dispatch(deleteContent({ listID, contentId }));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px,1fr)) ",
        marginTop: "100px",
      }}
    >
      {contents &&
        contents.map((content) => {
          return (
            <div
              key={content.id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                className="top-list"
                style={{
                  height: "40px",
                  backgroundColor: "transparent",
                  whidth: "100%",
                }}
              >
                <button
                  className="closeIcon"
                  style={{
                    position: "relative",
                    zIndex: "0",
                    cursor: "pointer",
                    backgroundColor: "green",
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    removeContent(content.id);
                  }}
                >
                  <CloseIcon style={{ position: "absolute", zIndex: "-1" }} />
                </button>
              </div>
              <img src={pathLogoImage(content)} alt="log of the media" />
              <h4>{content.name || content.title}</h4>
            </div>
          );
        })}
    </div>
  );
};

export default FavoriteList;

import React, { useState, useEffect, useContext } from "react";
import LoaderUI from "../Loader/LoaderUI";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteList } from "../../features/watchlists/Slice/lists.slice";
import { imagePath } from "../../utils/function/image.path";
import AppContext from "../../utils/Context/AppContextProvider";

const SmallCard = ({ defaultImage, list, typeList }) => {
  const { content, name, _id } = list;

  const { config } = useContext(AppContext);

  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  const filterContent = content?.filter((c) => c.poster_path);

  let numOfContentPoster = filterContent?.length - 1;
  let randomNum = Math.floor(Math.random() * numOfContentPoster);

  const handleCloseIcon = (_id) => {
    if (_id === "1") {
      return setIsShow(false);
    } else if (_id === "2") {
      return setIsShow(false);
    } else {
      return setIsShow(true);
    }
  };

  const removeList = (_id) => {
    let objectID = { _id };
    axios.delete("http://localhost:5000list/" + _id);
    dispatch(deleteList(objectID));
  };

  useEffect(() => {
    handleCloseIcon(_id);
  }, [_id]);

  return (
    <div className="small-card">
      {isShow ? (
        <div className="small-card__close-icon" onClick={() => removeList(_id)}>
          <CloseIcon />
        </div>
      ) : (
        ""
      )}
      <Link to={name} state={{ list, typeList: typeList }}>
        <div className="small-card__poster">
          {!content ? (
            <LoaderUI fixed={true} />
          ) : imagePath(config, "poster", content[randomNum], 1) ? (
            <img
              src={imagePath(config, "poster", content[randomNum], 1)}
              alt={"poster of " + name + " list"}
            />
          ) : (
            <div className="default-image">{defaultImage}</div>
          )}
        </div>
      </Link>
      <h3>{name}</h3>
    </div>
  );
};

export default SmallCard;

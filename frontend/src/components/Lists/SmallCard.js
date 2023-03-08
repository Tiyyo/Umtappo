import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import LoaderUI from "../Loader/LoaderUI";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteList } from "../../features/watchlists/Slice/lists";

const SmallCard = (props) => {
  const { list, typeList } = props;

  const { content, name, _id } = list;

  const { config } = useContext(AppContext);
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

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
    axios.delete("http://localhost:5000/list/" + _id);
    dispatch(deleteList(objectID));
  };

  useEffect(() => {
    handleCloseIcon(_id);
  }, [_id]);

  return (
    <div className="small-card">
      {console.log(_id === "1")}
      {isShow ? (
        <div
          className="small-card__close-icon"
          data-list-id={_id}
          onClick={() => removeList(_id)}
        >
          <CloseIcon />
        </div>
      ) : (
        ""
      )}
      <Link to={name} state={{ list, typeList: typeList }}>
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
      </Link>
      <h3>{name}</h3>
    </div>
  );
};

export default SmallCard;

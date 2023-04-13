import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import UserContext from "../../utils/Context/UserContextProvider";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addRating,
  editRating,
} from "../../features/rating/slice/rating.slice";
import useRating from "./useRating";

const RateMe = ({ isOpen, close, title, media_type, id }) => {
  const { userID } = useContext(UserContext);

  const dispatch = useDispatch();

  const [rate, setRate] = useState(null);

  const { rate: prevRate, isRated, rateId } = useRating(id, media_type);

  const handleSubmit = async () => {
    let userRate = Number(rate);

    if (isRated) {
      const result = await axios
        .patch("https://umtappo-api.onrender.com/rate/edit", {
          _id: rateId,
          newRate: rate,
        })
        .then(() => dispatch(editRating({ _id: rateId, newRate: rate })))
        .catch((err) => console.log(err));
    } else {
      const result = await axios
        .post("https://umtappo-api.onrender.com/rate/add", {
          userRate,
          user_id: userID,
          id,
          media_type,
        })
        .then((res) => {
          dispatch(addRating({ _id: res.data._id, id, media_type, rate }));
        })
        .catch((err) => console.log(err))
        .finally(() => close(false));
    }
  };

  useEffect(() => {
    setRate(prevRate);
  }, [isRated]);

  return (
    <div
      className="rate-me"
      style={
        isOpen
          ? { bottom: "0", visibility: "visible" }
          : { bottom: "0", visibility: "hidden" }
      }
    >
      <div className="rate-me__wrapper">
        <div
          className="rate-me__wrapper__close-icon"
          onClick={() => {
            close(false);
          }}
        >
          <CloseIcon />
        </div>
        <div className="rate-me__wrapper__my-rate">
          <div>{rate ? rate : "?"}</div>
          <p>
            You are rating <span>{title}</span>
          </p>
        </div>
        <div className="rate-me__wrapper__picking">
          <div className="star-container">
            <div className="star">
              {rate >= 1 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 2 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 3 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 4 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 5 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 6 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 7 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 8 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 9 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
            <div className="star">
              {rate >= 10 ? (
                <StarOutlinedIcon sx={{ fontSize: "1em" }} />
              ) : (
                <StarBorderOutlinedIcon sx={{ fontSize: "0.8em" }} />
              )}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={rate ? false : true}
        onClick={handleSubmit}
      >
        {isRated ? "Edit your rating" : "valid your rating"}
      </button>
    </div>
  );
};

export default RateMe;

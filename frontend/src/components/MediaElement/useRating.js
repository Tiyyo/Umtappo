import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useRating = (id, media_type) => {
  const dispatch = useDispatch();

  const { rates, loading } = useSelector((state) => state.rating);

  const [rate, setRate] = useState(null);
  const [isRated, setIsRated] = useState(false);
  const [rateId, setRateId] = useState(null);

  useEffect(() => {
    console.log(loading, rates);
    if (loading === "idle") {
      console.log(typeof rates);
      rates?.map((el) => {
        if (el.id === id && el.media_type === media_type) {
          setIsRated(true);
          setRateId(el._id);
          return setRate(el.rate);
        }
      });
    }
  }, [rates]);

  return { rate, isRated, rateId };
};

export default useRating;

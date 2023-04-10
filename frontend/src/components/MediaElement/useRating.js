import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useRating = (id, media_type) => {
  const { rates, loading } = useSelector((state) => state.rating);

  const [rate, setRate] = useState(null);
  const [isRated, setIsRated] = useState(false);
  const [rateId, setRateId] = useState(null);

  useEffect(() => {
    if (loading === "idle") {
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

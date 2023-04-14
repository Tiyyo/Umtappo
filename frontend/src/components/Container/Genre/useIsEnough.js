import { useContext, useLayoutEffect, useState } from "react";
import UserContext from "../../../utils/Context/UserContextProvider";

const useIsEnough = () => {
  const { scores } = useContext(UserContext);
  const [isEnough, setIsEnough] = useState(true);

  useLayoutEffect(() => {
    if (!scores) {
      return;
    }
    if (scores.filter((el) => el.occurency > 0).length > 5) {
      setIsEnough(true);
    } else setIsEnough(false);
  }, [scores]);
  return isEnough;
};

export default useIsEnough;

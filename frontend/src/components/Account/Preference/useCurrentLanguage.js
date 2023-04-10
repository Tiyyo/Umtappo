import { useContext, useEffect, useState } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";

const useCurrentLanguage = () => {
  const frenchISO = "fr-FR";
  const englishISO = "en-US";
  const espagnolISO = "es-ES";

  const [currentLanguage, setCurrentLanguage] = useState("English");
  const { languages } = useContext(AppContext);

  const getCurrentLanguage = () => {
    if (languages === frenchISO) return setCurrentLanguage("Français");
    if (languages === englishISO) return setCurrentLanguage("English");
    if (languages === espagnolISO) return setCurrentLanguage("Español");
  };

  useEffect(() => {
    getCurrentLanguage();
  }, [languages]);

  return currentLanguage;
};

export default useCurrentLanguage;

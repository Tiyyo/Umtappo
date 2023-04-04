import React, { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import RecommendIcon from "@mui/icons-material/Recommend";
import Switch from "@mui/material/Switch";
import { ThemeProvider } from "@mui/material";

const Preference = () => {
  const frenchISO = "fr-FR";
  const englishISO = "en-US";
  const espagnolISO = "es-ES";

  const {
    setLanguages,
    languages,
    setTheme,
    preferedTheme,
    iconTheme,
    setRecommendations,
    recommendations,
  } = useContext(AppContext);

  const getBackState = (e) => {
    if (e.target.value === "French") {
      window.localStorage.setItem("language", frenchISO);
      return setLanguages(frenchISO);
    }
    if (e.target.value === "Spannish") {
      window.localStorage.setItem("language", espagnolISO);
      return setLanguages(espagnolISO);
    }
    if (e.target.value === "English") {
      window.localStorage.setItem("language", englishISO);
      return setLanguages(englishISO);
    }
  };

  const getCurrentLanguage = () => {
    if (languages === frenchISO) return "Français";
    if (languages === englishISO) return "English";
    if (languages === espagnolISO) return "Español";
  };

  const getCurrrentTheme = () => {
    return preferedTheme === "dark" ? "primary" : "white";
  };

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="preference">
        <div className="preference__item">
          <div className="preference__item__icon">
            <LanguageIcon />
          </div>
          <label className="preference__item__name" htmlFor="languages">
            Languages
          </label>
          <select
            name="languages"
            id="languages"
            className="preference__item__action"
            onChange={(e) => getBackState(e)}
          >
            <option value="">{getCurrentLanguage()}</option>
            <option value="French">Français</option>
            <option value="Spannish">Español</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="preference__item">
          <div className="preference__item__icon">
            <InvertColorsIcon />
          </div>
          <p className="preference__item__name">Prefered Theme</p>
          <div className="preference__item__action">
            <button
              type="button"
              style={
                preferedTheme === "dark"
                  ? { color: "#fb8c00" }
                  : { color: "#484848" }
              }
              onClick={() => setTheme("dark")}
            >
              <DarkModeIcon color={getCurrrentTheme()} />
              Dark
            </button>
            <button
              type="button"
              style={
                preferedTheme === "light"
                  ? { color: "#c25e00" }
                  : { color: "rgba(235, 230, 225, 0.944)" }
              }
              onClick={() => setTheme("light")}
            >
              <LightModeIcon />
              Light
            </button>
          </div>
        </div>

        <div className="preference__item">
          <div className="preference__item__icon">
            <RecommendIcon />
          </div>
          <p className="preference__item__name">Recommendations</p>
          <div className="preference__item__action">
            <span>OFF</span>
            <Switch
              checked={recommendations}
              onChange={(e) => setRecommendations(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
              size="medium"
            />
            <span>ON</span>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Preference;

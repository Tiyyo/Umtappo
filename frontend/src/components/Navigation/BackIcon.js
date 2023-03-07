import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeProvider } from "@emotion/react";
import AppContext from "../../utils/Context/AppContextProvider";
import { useNavigate } from "react-router";

const BackIcon = () => {
  const { iconTheme } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={iconTheme}>
      <div className="back-icon" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" size="extraLarge" />
      </div>
    </ThemeProvider>
  );
};

export default BackIcon;

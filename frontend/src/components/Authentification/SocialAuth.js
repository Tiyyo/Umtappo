import React, { useContext } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppContext from "../../utils/Context/AppContextProvider";
import { ThemeProvider } from "@mui/material";

const SocialAuth = () => {
  const { iconTheme } = useContext(AppContext);
  return (
    <ThemeProvider theme={iconTheme}>
      <div className="social-auth">
        <button type="button" className="gmail_btn">
          <GoogleIcon color="primary" />
          <span>Google</span>
        </button>
        <button type="button" className="facebook_btn">
          <FacebookIcon color="primary" />
          <span>Facebook</span>
        </button>
      </div>
    </ThemeProvider>
  );
};

export default SocialAuth;

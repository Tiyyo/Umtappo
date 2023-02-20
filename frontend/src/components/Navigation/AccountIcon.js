import React, { useContext } from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Link } from "react-router-dom";
import { theme } from "../../theme/IconTheme";
import { ThemeProvider } from "@mui/material";
import AppContext from "../../utils/Context/AppContextProvider";

const AccountIcon = () => {
  const { iconTheme } = useContext(AppContext);
  return (
    <div className="account-icon">
      <Link to="/Account">
        <ThemeProvider theme={iconTheme}>
          <PersonPinIcon
            color="primary"
            size="large"
            sx={{ backgroundColor: "transparent", fontSize: "1.8rem" }}
          />
        </ThemeProvider>
      </Link>
    </div>
  );
};

export default AccountIcon;

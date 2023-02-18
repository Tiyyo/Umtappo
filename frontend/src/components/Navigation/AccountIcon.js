import React from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Link } from "react-router-dom";
import { theme } from "../../theme/IconTheme";
import { ThemeProvider } from "@mui/material";

const AccountIcon = () => {
  return (
    <div className="avatar">
      <Link to="/Account">
        <ThemeProvider theme={theme}>
          <PersonPinIcon
            color="primary"
            size="large"
            sx={{ backgroundColor: "transparent" }}
          />
        </ThemeProvider>
      </Link>
    </div>
  );
};

export default AccountIcon;

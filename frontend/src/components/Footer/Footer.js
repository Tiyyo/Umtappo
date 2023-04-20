import React, { memo } from "react";
import TmdbLogo from "../Logo/TmdbLogo";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconLink from "./IconLink";

const Footer = () => {
  console.log("did i render", "footer");
  return (
    <div className="footer">
      <div className="credits">
        <span>@powered by</span>
        <TmdbLogo />
      </div>
      <div className="social-media-links">
        <IconLink link={"https://github.com/Tiyyo"}>
          <GitHubIcon />
        </IconLink>
        <IconLink link={"https://www.linkedin.com/in/steeve-matou-220b99133/"}>
          <LinkedInIcon />
        </IconLink>
      </div>
    </div>
  );
};

export default Footer;

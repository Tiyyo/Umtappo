import React from "react";
import TmdbLogo from "../Logo/TmdbLogo";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "../Button/Button";

const Footer = () => {
  return (
    <div className="footer">
      <div className="credits">
        <span>@powered by</span>
        <TmdbLogo />
      </div>
      <div className="social-media-links">
        <div className="github-link">
          <a href={"https://github.com/Tiyyo"} target="_blank">
            <Button>
              <GitHubIcon />
            </Button>
          </a>
        </div>
        <div className="linkedIn-link">
          <a
            href={"https://www.linkedin.com/in/steeve-matou-220b99133/"}
            target="_blank"
          >
            <Button>
              <LinkedInIcon />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

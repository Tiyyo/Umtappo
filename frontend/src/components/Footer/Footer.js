import React from "react";
import TmdbLogo from "../Logo/TmdbLogo";

const Footer = () => {
  return (
    <div className="footer">
      <div className="credits">
        <span>powered by</span>
        <TmdbLogo />
      </div>
      <div className="social-media-links"></div>
    </div>
  );
};

export default Footer;

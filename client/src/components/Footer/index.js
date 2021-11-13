import React from "react";

const Footer = () => {
  return (
    <footer className="w-100 bg-primary flex">
      <div className="flex-row justify-center align-center">
        <h6 className="text-white text-center">
          {" "}
          Made with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{" "}
          by the <span className="footer-title">VodU</span> team. All Rights
          Reserved
        </h6>
      </div>
    </footer>
  );
};

export default Footer;

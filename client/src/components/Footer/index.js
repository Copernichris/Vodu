import React from "react";

const Footer = () => {
  return (
    <footer className="w-100 bg-primary p-2 flex">
      <div className="flex-row justify-center align-center mb-5">
        <h5 className="text-white text-center">
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
          by the Vodu team. All Rights Reserved
        </h5>
      </div>
    </footer>
  );
};

export default Footer;

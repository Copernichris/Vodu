import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-100 bg-primary p-4">
      <div className="container text-center mb-5">
        <Link variant="text" className="text-light">
          <h5>
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
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

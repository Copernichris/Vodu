import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";

const Header = () => {
  const logout = (event, error) => {
    event.preventDefault();
    Auth.logout();

    if (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-primary text-light mb-4 flex ">
      <div className="flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">VodU</h1>
            <p className="m-0">Get into the mind of a gamer...</p>
          </Link>
        </div>

        <FormControl variant="standard">
          <Input
            placeholder="Search VodU"
            className="text-light"
            endAdornment={
              <InputAdornment position="end" className="text-light">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="text-light btn" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <Link className="text-light btn" variant="text" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link variant="text" className="text-light btn" to="/login">
                Login
              </Link>
              <Link variant="text" className="text-light btn" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

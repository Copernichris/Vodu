import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Input } from "@mui/material";
import { Box } from "@mui/system";

const Header = () => {
  const logout = (event, error) => {
    event.preventDefault();
    Auth.logout();

    if (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-primary text-white flex ">
      <div className="flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-white" to="/">
            <h1 className="pl-4">VodU</h1>
          </Link>
        </div>

        <Box sx={{ width: 400, maxWidth: "80%," }}>
          <Input
            placeholder="Search VodU"
            className="text-white form-control mb-1"
            fullWidth
            endAdornment={
              <InputAdornment position="end" className="text-white">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>

        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="text-white pr-3" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <Link className="text-white pr-4" variant="text" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="text-white pr-3" to="/login">
                Login
              </Link>
              <Link className="text-white pr-4" to="/signup">
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

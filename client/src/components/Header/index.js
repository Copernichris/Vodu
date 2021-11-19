import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import SearchBar from "./SearchBar";

const Header = () => {
  const logout = (event, error) => {
    event.preventDefault();
    Auth.logout();

    if (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-primary" style={{display: 'flex', color: 'white', width: '100vw'}}>
      <div className="flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-white" to="/">
            <h1 className="pl-4">VodU</h1>
          </Link>
        </div>

        <SearchBar />

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
              <Login />
              <Signup />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

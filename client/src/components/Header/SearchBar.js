import React from "react";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Input } from "@mui/material";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useHistory();
  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  };

  {
    /* <Box sx={{ width: 400, maxWidth: "80%," }}>
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
        </Box> */
  }

  return (
    <Box sx={{ width: 300, maxWidth: "100%," }}>
      <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <label htmlFor="header-search">
          <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
          type="text"
          className="text-black form-control"
          id="header-search"
          placeholder="Search VodU"
        />
        <button type="submit">Search</button>
      </form>
    </Box>
  );
};

export default SearchBar;

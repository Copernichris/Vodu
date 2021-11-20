import React from "react";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Input } from "@mui/material";

const SearchBar = () => {
  return (
    <div>
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
    </div>
  );
};

export default SearchBar;

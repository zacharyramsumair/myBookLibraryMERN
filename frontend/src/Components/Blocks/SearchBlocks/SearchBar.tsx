import React, { useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import tags  from "../allTags";
import SearchIcon from "@mui/icons-material/Search";

type Props = {};

const SearchBar = (props: Props) => {
  let [selectedTag, setSelectedTag] = useState("All");
  let [searchQuery, setSearchQuery] = useState("");

  const handleSearchBarSubmit = () => {
    let searchReq = {
      tag: selectedTag,
      query: searchQuery,
    };
    console.log(searchReq);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchBarSubmit();
    }
  };

  return (
    <Paper
      sx={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
      }}
    >
      <TextField
        select
        variant="outlined"
        size="small"
        defaultValue="All"
        sx={{
          borderRadius: 1,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          maxWidth: {xs:"6em", sm:"fit-content"},
        }}
        onChange={(e) => {
          setSelectedTag(e.target.value);
        }}
      >
        {tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.backendName}>
          {tag.display}
        </MenuItem>
        ))}
      </TextField>

      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        sx={{ width: { sm: "20em", lg: "30em" } }}
        InputProps={{
          endAdornment: (
            <IconButton
              type="submit"
              aria-label="search"
              onClick={handleSearchBarSubmit}
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Paper>
  );
};

export default SearchBar;

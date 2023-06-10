import React from 'react'
import { Box, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { tags } from "../BlockFraming/FramingRightTopBand";
import SearchIcon from "@mui/icons-material/Search";

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <Paper sx={{ margin: "0 auto", display:"flex", justifyContent:"center" , width:"fit-content"}}>
    <TextField
        select
        variant="outlined"
        size="small"
        defaultValue="All"
        sx={{ borderRadius: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0,minWidth:"fit-content" }}
    >
        {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
                {tag}
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
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            ),
        }} />
</Paper>
  )
}

export default SearchBar
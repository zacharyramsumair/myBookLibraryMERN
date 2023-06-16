import React, { useState } from "react";
import {
	Box,
	IconButton,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import tags from "../allTags";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
	searchQuery:string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
	selectedTag: number;
	setSelectedTag: React.Dispatch<React.SetStateAction<number>>;
  handleSearchBarSubmit: () => void

};

const SearchBar = (props: Props) => {
	// let [selectedTag, setSelectedTag] = useState(0);
	// let [searchQuery, setSearchQuery] = useState("");

	// const handleSearchBarSubmit = () => {
	// 	let searchReq = {
	// 		tag: tags[props.selectedTag].backendName,
	// 		query: props.searchQuery,
	// 	};
	// 	console.log(searchReq);
	// };

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			props.handleSearchBarSubmit();
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
				defaultValue={0}
				sx={{
					borderRadius: 1,
					borderTopRightRadius: 0,
					borderBottomRightRadius: 0,
					width: "fit-content",
				}}
        value={props.selectedTag}
				onChange={(
					e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
				) => {
					props.setSelectedTag(parseInt(e.target.value)); // Convert the value to a number
				}}
			>
				{tags.map((tag) => (
					<MenuItem key={tag.id} value={tag.id}>
						{tag.display}
					</MenuItem>
				))}
			</TextField>

			<TextField
				variant="outlined"
				size="small"
				placeholder="Search"
				sx={{ width: { sm: "20em", lg: "30em" } }}
        value={props.searchQuery}
				InputProps={{
					endAdornment: (
						<IconButton
							type="submit"
							aria-label="search"
							onClick={props.handleSearchBarSubmit}
						>
							<SearchIcon />
						</IconButton>
					),
				}}
				onChange={(e) => props.setSearchQuery(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</Paper>
	);
};

export default SearchBar;

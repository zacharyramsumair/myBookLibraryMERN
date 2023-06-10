import React from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import {
	Box,
	IconButton,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import SearchCard from "./SearchCard";
import PaginationButtons from "../PaginationButtons/PaginationButtons";

type Props = {};

const book = {
	image:
		"https://images.unsplash.com/photo-1686224228069-3c5c946be26e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
	title: "Book Title",
	author: "Book Author",
	rating: 4.5,
	tags: ["Romance", "Drama", "Fiction", "Young Adult"],
	views: 1000,
	favorites: 500,
};

const SearchBlocksComponent = (props: Props) => {
	return (
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<SearchBar />

				<Box>
					<SearchCard book={book} />
					<SearchCard book={book} />
					<SearchCard book={book} />
					<SearchCard book={book} />
					<SearchCard book={book} />
				</Box>
                <PaginationButtons/>
			</Box>
		</BlockFraming>
	);
};

export default SearchBlocksComponent;

import React, { useContext, useEffect, useState } from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import {
	Box,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import SearchCard from "./SearchCard";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import { UserContext } from "../../../Contexts/UserContext";
import { useLocation } from "react-router-dom";
import { usePostSearch } from "../../../Hooks/Blocks/usePostSearch";
import tags from "../allTags";
import { ActiveNavbarContext } from "../../../Contexts/activeNavbarContext";

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
	let [selectedTag, setSelectedTag] = useState(0);
	let [searchQuery, setSearchQuery] = useState("");
	let [showPagination, setShowPagination] = useState(true);
	let [sortOption, setSortOption] = useState("views");
	let [sortOrder, setSortOrder] = useState("desc");

	let { globalSearchParameters, setGlobalSearchParameters } = useContext(
		ActiveNavbarContext
	);
	// let [searchParameters, setSearchParameters] = useState({
	// 	tag: "noSearch",
	// 	title: "noSearch",
	// 	sort: "ratingDesc",
	// 	page: "1",
	// 	limit: "10",
	// });

	let [searchParameters, setSearchParameters] = useState(
		globalSearchParameters
	);

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const page = queryParams.get("page") || "1";
	const limit = queryParams.get("limit") || "10";

	// let searchParameters = {
	// 	tag: "noSearch",
	// 	title: "noSearch",
	// 	sort: "ratingDesc",
	// 	page: "1",
	// 	limit: "10",
	// };

	const [totalPages, setTotalPages] = useState(10);

	let {
		postSearch,
		errorPostSearch,
		PostSearchData,
		isErrorPostSearch,
		isLoadingPostSearch,
		isSuccessPostSearch,
	} = usePostSearch();

	useEffect(() => {
		if (PostSearchData) {
			console.log(PostSearchData);

			if (PostSearchData.blocks.length > 0) {
				setTotalPages(PostSearchData.totalPages);
				setShowPagination(true);
			} else {
				setShowPagination(false);
			}
		}
	}, [PostSearchData]);

	useEffect(() => {
		let sort = "ratingDesc";
		if (sortOption == "views" && sortOrder == "desc") {
			sort = "viewsDesc";
		} else if (sortOption == "views" && sortOrder == "asc") {
			sort = "viewsAsc";
		} else if (sortOption == "rating" && sortOrder == "desc") {
			sort = "ratingDesc";
		} else if (sortOption == "rating" && sortOrder == "asc") {
			sort = "ratingAsc";
		}

		postSearch({ ...searchParameters, page, limit, sort });
	}, [page, limit, sortOption, sortOrder]);

	const handleSearchBarSubmit = () => {
		let sort = "ratingDesc";

		if (sortOption == "views" && sortOrder == "desc") {
			sort = "viewsDesc";
		} else if (sortOption == "views" && sortOrder == "asc") {
			sort = "viewsAsc";
		} else if (sortOption == "rating" && sortOrder == "desc") {
			sort = "ratingDesc";
		} else if (sortOption == "rating" && sortOrder == "asc") {
			sort = "ratingAsc";
		}

		let tempSearchParameters = {
			tag: tags[selectedTag].backendName,
			title: searchQuery,
			sort,
			page,
			limit,
			// sort: `${sortOption}${sortOrder === "asc" ? "Asc" : "Desc"}`,
			// page: string;
			// limit: string;
		};

		setSearchParameters(tempSearchParameters);
		setGlobalSearchParameters(tempSearchParameters);
		// console.log(sortOrder)
		// console.log(sortOption)

		postSearch(tempSearchParameters);
	};

	if (isLoadingPostSearch) {
		return (
			<BlockFraming hideSearch={false}>
				<Box sx={{ paddingX: 4 }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: 200,
						}}
					>
						<CircularProgress />
					</Box>
				</Box>
			</BlockFraming>
		);
	}

	let SearchCardElements = PostSearchData?.blocks.map((item: any) => {
		let cardData = {
			_id: item._id,
			image: item.imageUrl,
			title: item.title,
			author: item.createdBy.name,
			authorId: item.createdBy._id,
			rating: item.rating,
			tags: item.tags,
			tier: item.tier,
			views: item.views,
			favorites: item.favoriteCount,
		};

		return <SearchCard item={cardData} key={item._id} />;
	});

	return (
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					selectedTag={selectedTag}
					setSelectedTag={setSelectedTag}
					handleSearchBarSubmit={handleSearchBarSubmit}
				/>

				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<FormControl
						component="fieldset"
						sx={{ marginY: 2, marginX: 5 }}
					>
						<FormLabel component="legend">Sort by:</FormLabel>
						<RadioGroup
							row
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
							// sx={{ fontSize: "0.1rem" }} // Adjust the font size as per your requirements
						>
							<FormControlLabel
								value="views"
								control={<Radio />}
								label={
									<Typography
										variant="body2"
										sx={{ fontSize: "0.9rem" }}
									>
										Views
									</Typography>
								}
							/>
							<FormControlLabel
								value="rating"
								control={<Radio />}
								label={
									<Typography
										variant="body2"
										sx={{ fontSize: "0.9rem" }}
									>
										Rating
									</Typography>
								}
							/>
						</RadioGroup>
					</FormControl>

					<FormControl
						component="fieldset"
						sx={{ marginY: 2, marginX: 5 }}
					>
						<FormLabel component="legend">Sort order:</FormLabel>
						<RadioGroup
							row
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value)}
						>
							<FormControlLabel
								value="desc"
								control={<Radio />}
								label={
									<Typography
										variant="body2"
										sx={{ fontSize: "0.9rem" }}
									>
										Descending
									</Typography>
								}
							/>
							<FormControlLabel
								value="asc"
								control={<Radio />}
								label={
									<Typography
										variant="body2"
										sx={{ fontSize: "0.9rem" }}
									>
										Ascending
									</Typography>
								}
							/>
						</RadioGroup>
					</FormControl>
				</Box>


				{!showPagination && (
					<Box sx={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:5}}>
						<Typography>There are no blocks matching your search</Typography>
					</Box>
				)}

				{showPagination && (
					<Box>
						{SearchCardElements}
						{/* <SearchCard book={book} />
						<SearchCard book={book} />
						<SearchCard book={book} />
						<SearchCard book={book} />
						<SearchCard book={book} /> */}
					</Box>
				)}
				{showPagination && (
					<PaginationButtons
						totalPages={totalPages}
						page={Number(page)}
						route="search"
					/>
				)}
			</Box>
		</BlockFraming>
	);
};

export default SearchBlocksComponent;

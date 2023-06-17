import React, { useEffect, useState } from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import {
	Box,
	Button,
	Typography,
	Grid,
	Paper,
	IconButton,
	CircularProgress,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
} from "@mui/material";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import OurCard from "../ImageCarousel/OurCard";
import data from "../sampleBlocks";
import { useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../../../Contexts/UserContext";
import MyBlocksCard from "./MyBlocksCard";
import { useGetMyBlocks } from "../../../Hooks/Blocks/useGetMyBlocks";

type Props = {};

const MyBlocksComponent = (props: Props) => {
	const { user, setUser } = React.useContext(UserContext);
	let [showPagination, setShowPagination] = useState(false);
	let [sortBy, setSortBy] = useState("views");
	let [sortOrder, setSortOrder] = useState("desc");

	let navigate = useNavigate();

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const page = queryParams.get("page") || "1";
	const limit = queryParams.get("limit") || "10";
	const [totalPages, setTotalPages] = useState(10);

	// let {
	// 	postSearch,
	// 	errorPostSearch,
	// 	PostSearchData,
	// 	isErrorPostSearch,
	// 	isLoadingPostSearch,
	// 	isSuccessPostSearch,
	// } = usePostSearch();

	let {
		LoadingMyBlocks,
		ErrorMyBlocks,
		MyBlocksData,
		refetch,
	} = useGetMyBlocks({ page, limit, sortBy, sortOrder });

	useEffect(() => {
		if (MyBlocksData) {
			console.log(MyBlocksData);

			if (MyBlocksData.blocks.length > 0) {
				setTotalPages(MyBlocksData.totalPages);
				setShowPagination(true);
			} else {
				setShowPagination(false);
			}
		}
	}, [MyBlocksData]);

	useEffect(() => {
		// call post request again

		refetch();
	}, [page, limit, sortBy, sortOrder]);

	if (!user) {
		return (
			<BlockFraming hideSearch={true}>
				<Box sx={{ padding: 4 }}>
					<Typography variant="h4">You must be logged in</Typography>

					{/* <PaginationButtons /> */}
				</Box>
			</BlockFraming>
		);
	}

	if (!showPagination) {
		return (
			<BlockFraming hideSearch={true}>
				<Box sx={{ padding: 4 }}>
					<Typography
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 5,
						}}
						variant="h4"
					>
						You have no blocks
					</Typography>
				</Box>
			</BlockFraming>
		);
	}

	if (LoadingMyBlocks) {
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

	const cardElements = MyBlocksData.blocks.map((item: any) => {
		return (
			<MyBlocksCard
				key={item._id}
				item={{
					_id: item._id,
					image: item.imageUrl,
					title: item.title,
					author: item.createdBy.name,
					authorId: item.createdBy._id,
					rating: item.rating,
					tags: item.tags,
					views: item.views,
					favorites: item.favoriteCount,
					tier: item.tier,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
				}}
			/>
		);
	});

	// let cardElements = 6

	return (
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<Typography variant="h4">My Blocks</Typography>

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
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							// sx={{ fontSize: "0.1rem" }} // Adjust the font size as per your requirements
						>
							<FormControlLabel
								value="views"
								control={<Radio />}
								label={
									<Typography
										variant="body2"
										sx={{ fontSize: "0.8rem" }}
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
										sx={{ fontSize: "0.8rem" }}
									>
										Rating
									</Typography>
								}
							/>
							<FormControlLabel
								value="createdDate"
								control={<Radio />}
								label={
									<Typography
										variant="body2"
										sx={{ fontSize: "0.8rem" }}
									>
										Oldest
									</Typography>
								}
							/>
							<FormControlLabel
								value="lastUpdated"
								control={<Radio />}
								label={
									<Typography
										variant="body2"
										sx={{ fontSize: "0.8rem" }}
									>
										Last Updated
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
										sx={{ fontSize: "0.8rem" }}
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
										sx={{ fontSize: "0.8rem" }}
									>
										Ascending
									</Typography>
								}
							/>
						</RadioGroup>
					</FormControl>
				</Box>

				{showPagination && (
					<Grid container spacing={2} sx={{ marginTop: 2 }}>
						{cardElements}
						{/* <MyBlocksCard /> */}
					</Grid>
				)}

				{showPagination && (
					<PaginationButtons
						totalPages={totalPages}
						page={Number(page)}
						route="myBlocks"
					/>
				)}
			</Box>
		</BlockFraming>
	);
};

export default MyBlocksComponent;

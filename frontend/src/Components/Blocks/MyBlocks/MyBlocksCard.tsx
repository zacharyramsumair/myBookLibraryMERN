import React from "react";
import {
	Box,
	Paper,
	Typography,
	Button,
	useMediaQuery,
	Theme,
} from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import Styles from "./MyBlocks.module.css";
import allTags from "../allTags";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
	// item: {
	// 	_id: string;
	// 	image: string;
	// 	title: string;
	// 	author: string;
	// 	authorId?: string;
	// 	rating: number;
	// 	tags: string[];
	// 	views: number;
	// 	favorites: number;
	// 	tier: string;
	// };
};

const MyBlocksCard = (props: Props) => {
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);
	const isMediumScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("lg")
	);
	const isLargeScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("xl")
	);

	const getTagDisplayName = (backendName: string) => {
		const displayTag = allTags.find((tag) => tag.backendName === backendName);
		return displayTag ? displayTag.display : "";
	};
	return (
		<Paper sx={{ paddingY: 2, margin: 2, width: "100%" }}>
			<Box
				sx={{
					display: "grid",
					padding: 2,
				}}
				className={isSmallScreen ? Styles.gridAreaSm : Styles.gridAreaMd}
			>
				{/* Column 1: Item Image, Title, Author */}
				<Box
					sx={{
						display: "grid",
						gridArea: "image",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<img
							src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-book-cover-template-vector-realistic-illustration-isolated-on-gray-background-empty-png-image_1893997.jpg"
							// src={item.image}
							// alt={item.title}
							style={{ width: "6em", height: "8em" }}
						/>
					</Box>
				</Box>

				<Box
					sx={{
						display: "grid",
						gridArea: "basicBlockInfo",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography variant="body1">title of book</Typography>
						{/* <Typography variant="body1">{item.title}</Typography> */}

					</Box>
				</Box>

				{/* Column 2: Rating */}
				<Box
					sx={{
						display: "grid",
						gridArea: "rating",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography variant="body2">
							Rating: 3.56
							{/* Rating: {item.rating.toFixed(2)} */}
						</Typography>
					</Box>
				</Box>

				{/* Column 3: Views and Favorites */}
				<Box
					sx={{
						display: "grid",
						gridArea: "stats",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Visibility fontSize="small" />
							<Typography variant="body2" sx={{ marginLeft: 1 }}>
								100
								{/* {item.views} */}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								marginTop: 1,
							}}
						>
							<Favorite fontSize="small" />
							<Typography variant="body2" sx={{ marginLeft: 1 }}>
								65
								{/* {item.favorites} */}
							</Typography>
						</Box>
					</Box>
				</Box>

				{/* Column  4 : section with edit button */}

				<Box
					sx={{
						display: "grid",
						gridArea: "edit",
						placeItems: "center",
					}}
				>
					<Button variant="contained">
						{" "}
						<EditIcon sx={{ marginRight: 1 }} />
						Edit{" "}
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};

export default MyBlocksCard;

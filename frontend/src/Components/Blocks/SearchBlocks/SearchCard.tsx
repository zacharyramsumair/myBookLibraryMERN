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
import SearchStyle from "./Search.module.css";
import allTags from "../allTags";
import { Link, useNavigate } from "react-router-dom";

type SearchCardProps = {
	item: {
		_id: string;
		image: string;
		title: string;
		author: string;
		authorId?: string;
		rating: number;
		tags: string[];
		views: number;
		favorites: number;
		tier: string;
	};
};

const SearchCard = ({ item }: SearchCardProps) => {
	let navigate = useNavigate();

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
		<Paper
			sx={{ paddingY: 2, margin: 2, cursor: "pointer" }}
			onClick={() => navigate(`/block/${item._id}`)}
		>
			<Box
				sx={{
					display: "grid",
					padding: 2,
				}}
				className={
					isSmallScreen ? SearchStyle.gridAreaSm : SearchStyle.gridAreaMd
				}
			>
				{/* Column 1: Item Image, Title, Author */}
				<Box
					sx={{
						display: "grid",
						gridArea: "image",
						justifyItems: "center"
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							position: "relative",
							width: { xs: "100%", md: "6em" },
							// width: "6em",
							height: "8em",
							marginX: 2,
						}}
					>
						<img
							crossOrigin="anonymous"
							src={item.image}
							alt={item.title}
							style={{ width: "6em", height: "8em" }}
						/>
						{item.tier == "paid" && (
							<Box
								component="div"
								sx={{
									position: "absolute",
									top: 3,
									right: {
										xs: `calc((100% - 6em) / 2 + 5px)`,
										md: 3
									  },
								}}
							>
								{/* <DiamondIcon sx={{color:"#FFD700"}} /> */}
								<svg
									style={{
										borderRadius: "50%",
										backgroundColor: "#FFD700",
										color: "#fff",
									}}
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 16 16"
								>
									<path
										fill="currentColor"
										d="M7.51 4.87C7.01 6.27 6.45 6.95 5.94 7c-.57.07-1.07-.18-1.54-.8a.54.54 0 0 0-.1-.1 1 1 0 1 0-.8.4l.01.12.82 3.24A1.5 1.5 0 0 0 5.78 11h4.44a1.5 1.5 0 0 0 1.45-1.14l.82-3.24a.54.54 0 0 0 .01-.12 1 1 0 1 0-.8-.4.54.54 0 0 0-.1.09c-.49.62-1 .87-1.54.81-.5-.05-1.04-.74-1.57-2.13a1 1 0 1 0-.98 0zM11 11.75a.5.5 0 1 1 0 1H5a.5.5 0 1 1 0-1h6z"
									></path>
								</svg>
							</Box>
						)}
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
						<Typography variant="body1">{item.title}</Typography>
						<Typography variant="body1">
							{item.author.substring(0, 75)}{" "}
							{item.author.length > 75 ? "..." : ""}
						</Typography>
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
							Rating: {item.rating.toFixed(2)}
						</Typography>
					</Box>
				</Box>

				{/* Column 3: Tags */}
				<Box
					sx={{
						display: "grid",
						gridArea: "tags",
						width: { xs: "100%", md: "10em" },
					}}
				>
					<Typography
						variant="body2"
						sx={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{item.tags.map((tag, index) => (
							// <Button key={tag} variant="outlined" size="small" sx={{fontSize:"0.8rem"}}>
							// 	{getTagDisplayName(tag)}
							// </Button>
							<Box
								key={index}
								component={"span"}
								sx={{ paddingX: "1px" }}
							>
								<Link style={{ color: "#5A5A5A" }} to="#">
									{/* <Link style={{ color: "#5A5A5A" }} to={`/${tag}`}> */}
									{getTagDisplayName(tag)}
								</Link>
								{item.tags.indexOf(tag) !== item.tags.length - 1 && ","}
							</Box>
						))}
					</Typography>
				</Box>

				{/* Column 4: Views and Favorites */}
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
								{item.views}
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
								{item.favorites}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
};

export default SearchCard;

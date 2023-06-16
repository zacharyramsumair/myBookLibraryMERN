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
import { Link } from "react-router-dom";

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
		<Paper sx={{ paddingY: 2, margin: 2 }}>
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
							src={item.image}
							alt={item.title}
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
						<Typography variant="body1">{item.title}</Typography>
						<Typography variant="body1">{item.author.substring(0,75)} {item.author.length>75 ? "..." : ""}</Typography>
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
						<Typography variant="body2">Rating: {item.rating.toFixed(2)}</Typography>
					</Box>
				</Box>

				{/* Column 3: Tags */}
				<Box
					sx={{
						display: "grid",
						gridArea: "tags",
						width: {xs:"100%", md: "10em"}
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
							<Box key={index} component={"span"} sx={{paddingX:"1px"}}>
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

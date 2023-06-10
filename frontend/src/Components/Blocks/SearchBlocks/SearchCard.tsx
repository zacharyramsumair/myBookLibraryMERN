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

type SearchCardProps = {
	book: {
		image: string;
		title: string;
		author: string;
		rating: number;
		tags: string[];
		views: number;
		favorites: number;
	};
};

const SearchCard = ({ book }: SearchCardProps) => {
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);
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
				{/* Column 1: Book Image, Title, Author */}
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
							src={book.image}
							alt={book.title}
							style={{ width: "6em", height: "8em" }}
						/>
					</Box>
				</Box>

				<Box
					sx={{
						display: "grid",
						gridArea: "basicBookInfo",
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
						<Typography variant="h6">{book.title}</Typography>
						<Typography variant="body1">{book.author}</Typography>
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
						<Typography variant="body2">Rating: {book.rating}</Typography>
					</Box>
				</Box>

				{/* Column 3: Tags */}
				<Box
					sx={{
						display: "grid",
						gridArea: "tags",
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
						{book.tags.map((tag) => (
							<Button key={tag} variant="outlined" size="small">
								{tag}
							</Button>
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
								{book.views}
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
								{book.favorites}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
};

export default SearchCard;

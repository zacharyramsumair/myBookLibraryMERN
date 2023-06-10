import React from "react";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import Framing from "./Framing.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {};

const FramingLeft = (props: Props) => {
	return (
		<Grid
			item
			xs={0}
			md={2}
			sx={{
				backgroundColor: "lightblue",
				display: { xs: "none", md: "block" },
				borderTopLeftRadius: 10,
				borderBottomLeftRadius: 10,
			}}
		>
			{/* <List sx={{ maxHeight: '100%'}}> */}
			<List sx={{ maxHeight: "100%", overflow: "auto", margin: "0 auto" }}>
				<ListItem>
					<img
						className={Framing.logo}
						src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c51f.png"
						alt=""
					/>
				</ListItem>
				<ListItem sx={{ padding: {md:"0.5em 1.5em",lg:"0.5em 3em"} }}>
					<HomeIcon />
					<Typography sx={{ marginLeft: 1 }}>Home</Typography>
				</ListItem>
				<ListItem sx={{ padding: {md:"0.5em 1.5em",lg:"0.5em 3em"} }}>
					<SearchIcon />
					<Typography sx={{ marginLeft: 1 }}>Search</Typography>
				</ListItem>
				<ListItem sx={{ padding: {md:"0.5em 1.5em",lg:"0.5em 3em"} }}>
					<BookIcon />
					<Typography sx={{ marginLeft: 1 }}>My Shelf</Typography>
				</ListItem>
				<ListItem sx={{ padding: {md:"0.5em 1.5em",lg:"0.5em 3em"} }}>
					<FavoriteIcon />
					<Typography sx={{ marginLeft: 1 }}>Favorites</Typography>
				</ListItem>
			</List>
		</Grid>
	);
};

export default FramingLeft;
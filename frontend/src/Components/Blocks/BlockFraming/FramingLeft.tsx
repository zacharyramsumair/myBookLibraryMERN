import React, { useContext } from "react";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import Framing from "./Framing.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ActiveNavbarContext } from "../../../Contexts/activeNavbarContext";

type Props = {
	
};

const FramingLeft = (props: Props) => {
	let navigate = useNavigate();

	let {activeNavSection, setActiveNavSection } = useContext(ActiveNavbarContext);


	return (
		<Grid
			item
			xs={0}
			md={2}
			sx={{
				backgroundColor: "#fff",
				// backgroundColor: "lightblue",
				display: { xs: "none", md: "block" },
				borderTopLeftRadius: 10,
				borderBottomLeftRadius: 10,
			}}
		>
			{/* <List sx={{ maxHeight: '100%'}}> */}
			<List sx={{ maxHeight: "100%", overflow: "auto", margin: "0 auto" }}>
				<ListItem onClick={() => {
							navigate("/");
							setActiveNavSection("home");
						}}>
					<img
						className={Framing.logo}
						src={logo}
						// src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c51f.png"
						alt=""
						
					/>
				</ListItem>
				<ListItem
					sx={{ padding: { md: "0.5em 1.5em", lg: "0.5em 3em" },
					//  background:activeNavSection == "home" ? "inherit":"inherit", 
					 opacity:activeNavSection === "home" ? 1:0.5, 
					 background:activeNavSection === "home" ? "#e3e3e3":"inherit", 
					}}
					onClick={() => {
						navigate("/");
						setActiveNavSection("home");
					}}
				>
					<HomeIcon />
					<Typography sx={{ marginLeft: 1 }}>Home</Typography>
				</ListItem>
				<ListItem
					sx={{ padding: { md: "0.5em 1.5em", lg: "0.5em 3em" } ,
					opacity:activeNavSection === "search" ? 1:0.5, 
					background:activeNavSection === "search" ? "#e3e3e3":"inherit", 


				}}
					onClick={() => {
						navigate("/search");
						setActiveNavSection("search");
					}}
				>
					<SearchIcon />
					<Typography sx={{ marginLeft: 1 }}>Search</Typography>
				</ListItem>
				<ListItem
					sx={{ padding: { md: "0.5em 1.5em", lg: "0.5em 3em" },
					opacity:activeNavSection === "shelf" ? 1:0.5, 
					background:activeNavSection === "shelf" ? "#e3e3e3":"inherit", 
 
				}}
					onClick={() => {
						navigate("/shelf");
						setActiveNavSection("shelf");
					}}
				>
					<BookIcon />
					<Typography sx={{ marginLeft: 1 }}>My Shelf</Typography>
				</ListItem>
				<ListItem
					sx={{ padding: { md: "0.5em 1.5em", lg: "0.5em 3em" },
					opacity:activeNavSection === "favorites" ? 1:0.5,
					background:activeNavSection === "favorites" ? "#e3e3e3":"inherit", 
 
				}}
					onClick={() => {
						navigate("/favorites");
						setActiveNavSection("favorites");
					}}
				>
					<FavoriteIcon />
					<Typography sx={{ marginLeft: 1 }}>Favorites</Typography>
				</ListItem>
			</List>
		</Grid>
	);
};

export default FramingLeft;

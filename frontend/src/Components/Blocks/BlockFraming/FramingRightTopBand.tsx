import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import {
	Box,
	IconButton,
	Menu,
	Paper,
	Theme,
	useMediaQuery,
} from "@mui/material";
import { Drawer, List, ListItem, ListItemText, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Framing from "./Framing.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import ConstructionIcon from "@mui/icons-material/Construction";
import logo from "../../../assets/logo.png";
import { ActiveNavbarContext } from "../../../Contexts/activeNavbarContext";
import { useNavigate } from "react-router-dom";

export const tags = ["All", "nonfiction", "romance", "action"];

type Props = {
	hideSearch: boolean;
};

const FramingRightTopBand = (props: Props) => {
	let { activeNavSection, setActiveNavSection } = useContext(
		ActiveNavbarContext
	);
	let navigate = useNavigate();

	const [isDrawerOpen, setDrawerOpen] = React.useState(false);

	const [anchorEl, setAnchorEl] = React.useState<
		(EventTarget & HTMLDivElement) | null
	>(null);

	let [selectedTag, setSelectedTag] = useState("All");
	let [searchQuery, setSearchQuery] = useState("");

	const handleSearchBarSubmit = () => {
		let searchReq = {
			tag: selectedTag,
			query: searchQuery,
		};
		console.log(searchReq);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearchBarSubmit();
		}
	};

	const handleAvatarClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerToggle = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const theme = useTheme();

	const isXsOrSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					position: "sticky",
					top: 0,
					background: "#F3F3F7",
					// background: "pink",
					zIndex: 1000,
					borderBottom: "1px solid #dedee3",
				}}
			>
				<Box sx={{ margin: 3, display: { xs: "flex", md: "none" } }}>
					<MenuIcon
						onClick={handleDrawerToggle}
						sx={{ fontSize: "2rem" }}
					/>
				</Box>
				<Paper
					sx={{
						margin: 3,
						display: {
							xs: "none",
							sm: props.hideSearch ? "none" : "flex",
						},
					}}
				>
					<TextField
						select
						variant="outlined"
						size="small"
						defaultValue="All"
						sx={{
							borderRadius: 1,
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
						}}
						onChange={(e) => {
							setSelectedTag(e.target.value);
						}}
					>
						{tags.map((tag) => (
							<MenuItem key={tag} value={tag}>
								{tag}
							</MenuItem>
						))}
					</TextField>

					<TextField
						variant="outlined"
						size="small"
						placeholder="Search"
						sx={{ width: { sm: "20em", lg: "30em" } }}
						InputProps={{
							endAdornment: (
								<IconButton
									type="submit"
									aria-label="search"
									onClick={handleSearchBarSubmit}
								>
									<SearchIcon />
								</IconButton>
							),
						}}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</Paper>

				<Box
					sx={{
						// margin: 3,
						padding: 3,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						ml: "auto", // Move the Avatar to the right
						order: { xs: 1, md: 0 }, // Change the order on xs screens
						// width: "100%",
					}}
				>
					<Avatar
						alt="User Avatar"
						src="data:image/jpeg;base64,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"
						onClick={(e) => handleAvatarClick(e)}
					/>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem
							onClick={() => {
								handleMenuClose();
								navigate("/creatorStudio");
							}}
						>
							<ConstructionIcon sx={{ marginRight: 1 }} />
							<Typography>Creator Studio</Typography>
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleMenuClose();
								navigate("/settings");
							}}
						>
							{" "}
							<SettingsIcon sx={{ marginRight: 1 }} />
							<Typography>Settings</Typography>
						</MenuItem>
					</Menu>{" "}
				</Box>
			</Box>
			<Drawer
				open={isDrawerOpen}
				onClose={handleDrawerToggle}
				variant="temporary"
				// sx={{display:{xs:"flex",md:"none"}, width:"50vw"}}
			>
				<List
					sx={{
						display: { xs: "flex", md: "none" },
						width: "45vw",
						flexDirection: "column",
					}}
				>
					{/* <ListItem button>
						<ListItemText primary="Menu Item 1" />
					</ListItem>
					<ListItem button>
						<ListItemText primary="Menu Item 2" />
					</ListItem> */}

					<ListItem>
						<img
							className={Framing.logo}
							src={logo}
							// src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c51f.png"
							alt=""
							onClick={() => {
								navigate("/");
								setActiveNavSection("home");
							}}
						/>
					</ListItem>
					<ListItem
						sx={{
							padding: { xs: "1.0em 1.5em" },
							opacity: activeNavSection === "home" ? 1 : 0.5,
							background:
								activeNavSection === "home" ? "#e3e3e3" : "inherit",
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
						sx={{
							padding: { xs: "1.0em 1.5em" },
							opacity: activeNavSection === "search" ? 1 : 0.5,
							background:
								activeNavSection === "search" ? "#e3e3e3" : "inherit",
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
						sx={{
							padding: { xs: "1.0em 1.5em" },
							opacity: activeNavSection === "shelf" ? 1 : 0.5,
							background:
								activeNavSection === "shelf" ? "#e3e3e3" : "inherit",
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
						sx={{
							padding: { xs: "1.0em 1.5em" },
							opacity: activeNavSection === "favorites" ? 1 : 0.5,
							background:
								activeNavSection === "favorites"
									? "#e3e3e3"
									: "inherit",
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
			</Drawer>
		</>
	);
};

export default FramingRightTopBand;

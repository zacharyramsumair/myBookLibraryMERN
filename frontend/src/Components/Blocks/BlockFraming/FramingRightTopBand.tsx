import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Box, Theme, useMediaQuery } from "@mui/material";
import { Drawer, List, ListItem, ListItemText, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Framing from "./Framing.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";

const tags = ["All", "nonfiction", "romance", "action"];

type Props = {};

const FramingRightTopBand = (props: Props) => {
	const [isDrawerOpen, setDrawerOpen] = React.useState(false);

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
					backgroundColor: "pink",
				}}
			>
				<Box sx={{ margin: 3, display: { xs: "flex", md: "none" } }}>
					<MenuIcon
						onClick={handleDrawerToggle}
						sx={{ fontSize: "2rem" }}
					/>
				</Box>
				<Box sx={{ margin: 3, display: { xs: "none", sm: "flex" } }}>
					<TextField
						select
						variant="outlined"
						size="small"
						defaultValue="All"
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
					/>
				</Box>

				{isSmallScreen ? (
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
						<Avatar alt="User Avatar" src="/path/to/user-image.jpg" />
					</Box>
				) : (
					<Box sx={{ margin: 3, display: "flex", alignItems: "center" }}>
						<Avatar
							alt="User Avatar"
							src="/path/to/user-image.jpg"
							sx={{ marginRight: 1 }}
						/>
						<Typography
							variant="body1"
							sx={{ display: { xs: "none", md: "flex" } }}
						>
							John Doe
						</Typography>
					</Box>
				)}
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
							src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c51f.png"
							alt=""
						/>
					</ListItem>
					<ListItem sx={{ padding: { xs: "1.0em 1.5em" } }}>
						<HomeIcon />
						<Typography sx={{ marginLeft: 1 }}>Home</Typography>
					</ListItem>
					<ListItem sx={{ padding: { xs: "1.0em 1.5em" } }}>
						<SearchIcon />
						<Typography sx={{ marginLeft: 1 }}>Search</Typography>
					</ListItem>
					<ListItem sx={{ padding: { xs: "1.0em 1.5em" } }}>
						<BookIcon />
						<Typography sx={{ marginLeft: 1 }}>My Shelf</Typography>
					</ListItem>
					<ListItem sx={{ padding: { xs: "1.0em 1.5em" } }}>
						<FavoriteIcon />
						<Typography sx={{ marginLeft: 1 }}>Favorites</Typography>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
};

export default FramingRightTopBand;

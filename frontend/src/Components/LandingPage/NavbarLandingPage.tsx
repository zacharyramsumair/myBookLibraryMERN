import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

const drawerWidth = 250;
const navItems = [
	{ text: "Login", link: "/login" },
	{ text: "Register", link: "/register" },
	{ text: "Pricing", link: "/pricing" },
	{ text: "FAQ", link: "/FAQ" },
];

export default function Navbar(props: Props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				MUI
			</Typography>
			<Divider />
			<List>
				{navItems.map((item, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							{/* <ListItemText primary={item} /> */}
							<Typography
								variant="h6"
								
								component="a"
								href={item.link}
								sx={{
                                    textAlign:"center",
                                    display:"flex",
                                    justifyContent:"center",
                                    color:"black",
                                    textDecoration:"none",
                                    alignItems:"center"
                                }}
							>
								{item.text}
							</Typography>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>

					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", sm: "none" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							flexGrow: 1,
							justifyContent: "center",
						}}
					>
						LOGO
					</Typography>
					<Typography
						variant="h6"
						component="a"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" },color:"white",
                        textDecoration:"none"  }}
                        href="/"
					>
						MUI
					</Typography>

					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navItems.map((item,index) => (
							<Button key={index} sx={{ color: "#fff" }}>
								<Typography
								variant="body1"
								component="a"
								href={item.link}
								sx={{
                                    textAlign:"center",
                                    display:"flex",
                                    justifyContent:"center",
                                    color:"white",
                                    textDecoration:"none",
                                    alignItems:"center"
                                }}
							>
								{item.text}
							</Typography>
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</React.Fragment>
	);
}

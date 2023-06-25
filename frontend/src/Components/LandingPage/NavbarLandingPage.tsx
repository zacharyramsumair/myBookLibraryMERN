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
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useLogout } from "../../Hooks/Auth/useLogoutUser";
import logo from "../../assets/logo.png";

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

const drawerWidth = 250;
const navItems = [
	{ text: "Login", link: "/login", removeWhenUser: true },
	{ text: "Register", link: "/register", removeWhenUser: true },
];

export default function Navbar(props: Props) {
	const { user, setUser } = React.useContext(UserContext);
	// if (user) {
	// 	console.log("user", user);
	// }

	let { logout, error, data, isError, isLoading, isSuccess } = useLogout();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Link to="/">
				<img crossOrigin="anonymous" src={logo} style={{ width: "8em", height: "8em" }} />
			</Link>
			<Divider />
			<List>
				{user && (
					<>
						<ListItem disablePadding>
							<ListItemButton sx={{ textAlign: "center" }}>
								<Typography
									variant="h6"
									sx={{
										textAlign: "center",
										display: "flex",
										justifyContent: "center",
										color: "black",
										textDecoration: "none",
										alignItems: "center",
										textDecorationLine: "none", // Add this line to remove the underline
									}}
								>
									Hello {user.name}
								</Typography>
							</ListItemButton>
						</ListItem>

						<ListItem
							disablePadding
							onClick={() => {
								logout();
								setUser(null);
							}}
						>
							<ListItemButton sx={{ textAlign: "center" }}>
								<Typography
									variant="h6"
									sx={{
										textAlign: "center",
										display: "flex",
										justifyContent: "center",
										color: "black",
										textDecoration: "none",
										alignItems: "center",
										textDecorationLine: "none", // Add this line to remove the underline
									}}
								>
									Logout
								</Typography>
							</ListItemButton>
						</ListItem>
					</>
				)}

				{navItems.map((item, index) => {
					if (item.removeWhenUser && user) {
						return null;
					} else {
						return (
							<ListItem key={index} disablePadding>
								<ListItemButton sx={{ textAlign: "center" }}>
									<Link to={item.link}>
										<Typography
											variant="h6"
											sx={{
												textAlign: "center",
												display: "flex",
												justifyContent: "center",
												color: "black",
												textDecoration: "none",
												alignItems: "center",
												textDecorationLine: "none", // Add this line to remove the underline
											}}
										>
											{item.text}
										</Typography>
									</Link>
								</ListItemButton>
							</ListItem>
						);
					}
				})}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar component="nav" sx={{backgroundColor:"#FF9500"}} >
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

					{/* <Link to="/">
						<Typography
							variant="h6"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "flex", sm: "none" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								textDecoration: "none",
								flexGrow: 1,
								justifyContent: "center",
								color: "#fff",
							}}
						>
							LOGO
						</Typography>
					</Link> */}

					<Box
						sx={{
							display: "flex",
							width: "100%",
							justifyContent: "space-between",
						}}
					>
						<Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
							{/* <Link to="/"> */}
								{/* <img src={logo} style={{ width: "3em", height: "3em" }} /> */}
							{/* </Link> */}
						</Box>

						<Box sx={{ display: { xs: "none", sm: "block" } }}>
							{user && (
								<>
									<Button sx={{ color: "#fff" }}>
										<Typography
											variant="body1"
											sx={{
												textAlign: "center",
												display: "flex",
												justifyContent: "center",
												color: "white",
												textDecoration: "none",
												alignItems: "center",
											}}
										>
											Hello {user.name.slice(0, 10)}
										</Typography>
									</Button>
									<Button
										sx={{ color: "#fff" }}
										onClick={() => {
											logout();
											setUser(null);
										}}
									>
										<Typography
											variant="body1"
											sx={{
												textAlign: "center",
												display: "flex",
												justifyContent: "center",
												color: "white",
												textDecoration: "none",
												alignItems: "center",
											}}
										>
											Logout
										</Typography>
									</Button>
								</>
							)}

							{navItems.map((item, index) => {
								if (item.removeWhenUser && user) {
									return null;
								} else if (item.removeWhenUser && !user) {
									return (
										<Button key={index} sx={{ color: "#fff" }}>
											<Link to={item.link}>
												<Typography
													variant="body1"
													sx={{
														textAlign: "center",
														display: "flex",
														justifyContent: "center",
														color: "white",
														textDecoration: "none",
														alignItems: "center",
													}}
												>
													{item.text}
												</Typography>
											</Link>
										</Button>
									);
								} else {
									return (
										<Button key={index} sx={{ color: "#fff" }}>
											<Link to={item.link}>
												<Typography
													variant="body1"
													sx={{
														textAlign: "center",
														display: "flex",
														justifyContent: "center",
														color: "white",
														textDecoration: "none",
														alignItems: "center",
													}}
												>
													{item.text}
												</Typography>
											</Link>
										</Button>
									);
								}
							})}
						</Box>
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

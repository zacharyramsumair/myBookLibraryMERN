import React from "react";
import { Box, Typography, Link, Grid, TextField, Button } from "@mui/material";
import logo from "../../assets/logo.png"

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "#000",
				color: "#fff",
				padding: "2em 3em",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			<Grid
				container
				spacing={2}
				// justifyContent= "center"
				// justifyContent={{ xs: "center", sm: "flex-start", md: "space-around" }}
				// alignItems="center"
				sx={{ flexGrow: 1 }}
			>
				{/* <Grid item xs={5} sm={6} md={3} sx={{ pt: 0 }}>
					<Typography variant="body2" sx={{ pt: 0 }}>
						<Link sx={{ color: "#fff", textDecoration: "none" }} href="/">
							<img src={logo} alt="logo" style={{width:"10em", height:"auto"}} />
						</Link>
					</Typography>
				</Grid> */}

				<Grid item xs={6}  md={3.5}>
					<Link
						sx={{ color: "#fff", textDecoration: "none" }}
						href="/try-now"
					>
						Try Now
					</Link>
				</Grid>

				<Grid item xs={6}  md={3.5}>
					<Grid container direction="column" spacing={2}>
						<Grid item>
							<Link
								sx={{ color: "#fff", textDecoration: "none" }}
								href="/register"
							>
								Register
							</Link>
						</Grid>
						<Grid item>
							<Link
								sx={{ color: "#fff", textDecoration: "none" }}
								href="/login"
							>
								Login
							</Link>
						</Grid>
					</Grid>
				</Grid>

				<Grid
					item
					xs={12}
					md={5}
					sx={{
						width: { xs: "100vw", md: "auto" },
						// marginX: { xs: "auto", md: "0" },
						marginX: { xs: "5%", sm: "10%", md: "0" },
					}}
				>
          <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
					<Typography variant="body2">
						Subscribe to our newsletter:
					</Typography>
					<Grid container spacing={1} sx={{alignItems:"center", width:'100%', justifyContent:"center"}} >
						<Grid item >
							<TextField
								id="email"
								label="Email"
								variant="outlined"
								size="small"
								sx={{ backgroundColor: "#fff", borderRadius:1 }}
							/>
						</Grid>
						<Grid item sx={{ my: 2 }}>
							<Button variant="contained" color="primary">
								Subscribe
							</Button>
						</Grid>
					</Grid>
          </Box>

				</Grid>
			</Grid>
		</Box>
	);
};

export default Footer;

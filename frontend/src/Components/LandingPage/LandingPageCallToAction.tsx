import React, { useContext } from "react";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import { UserContext } from "../../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import bookBlocks  from "../../assets/bookBlocks.png"

type Props = {};

const LandingPageCallToAction = (props: Props) => {
	//smaller than medium breakpoint ( including small)
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);
	//larger than medium breakpoint (not including medium)
	const isMediumScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("lg")
	);


	// let { user, setUser } = useContext(UserContext);
	// let navigate = useNavigate();

	// if (user) {
	// 	navigate("/settings");
	//   }

	return (
		<Box
			sx={{
				height: "100vh",
				width: "100vw",
				paddingTop: { sm: "56px", md: "64px" },
				display: "flex",
				flexDirection: { xs: "column", sm: "column", md: "row" },
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					width: { xs: "100vw", md: "70vw" },
					height: { xs: "70vh", md: "100vh" },
					backgroundColor: "#E8E4D3",
					// opacity:0.8,
					// backgroundColor: { xs: 'red', sm: 'green', md: 'yellow', lg: 'pink', xl: 'orange' },
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					paddingBottom: { xs: "4em", sm: "5em", md: "1em" }, // Adding padding bottom for sm screen
					position: "relative", // Add position relative to enable absolute positioning of the cat image
				}}
			>
				<Box
					sx={{
						textAlign: { xs: "center", md: "left" },
						color: "#000",
						marginX: { xs: "5%", md: "1%", lg: "20%" },
					}}
				>
					<Typography
						variant={isMediumScreen? "h2" :isSmallScreen ? "h3" : "h1"}
						component="h1"
						sx={{ mb: 2, fontWeight: 700 }}
					>
						Build your Future. 
					
					</Typography>
					<Typography
						variant={"h5"}
						component="h2"
						sx={{ mb: 2, fontWeight: 700 }}
					>
						One Block at a time
					
					</Typography>
					<Typography variant="body1" sx={{ mb: 2, color: "#6e6c65", width:{xs:"100%",md:"75%", lg:"85%"} }}>
						Read anything you want right now, like seriously. Come one,
						try it. It's Free !
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: { xs: "center", md: "flex-start" },
							alignItems: "center",
						}}
					>
						<Link to="/">
						<Button
							variant="contained"
							
							sx={{
								
								backgroundColor: "#FFB3A6",
								color: "#000",
								"&:hover, &:focus": {
									backgroundColor: "#FF977D",
								},
							}}
						>
							Try for Free
						</Button>
						</Link>
						{/* <Button variant="contained" color="secondary">
            Buy ME
          </Button> */}
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					width: { xs: "100vw", md: "30vw" },
					height: { xs: "30vh", md: "100vh" },
					backgroundColor: "#1B1A20",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
				}}
			>
				<Box
					sx={{
						position: "absolute",
						left: { xs: "auto", md: "-10em" },
						top: { xs: "-7.5em", md: "13em" },
						display: { xs: "block", md: "block" },
						overflowX: "visible",
					}}
				>
					<img
					crossOrigin="anonymous"
						className="landingImage"
						// src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Pan_Blue_Circle.png"
						src={bookBlocks}
						alt=""
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default LandingPageCallToAction;

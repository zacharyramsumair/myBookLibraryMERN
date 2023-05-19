import React from "react";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";

type Props = {};

const LandingPageCallToAction = (props: Props) => {
	//smaller than medium breakpoint ( including small)
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);
	//larger than medium breakpoint (not including medium)
	const isMediumScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up("md")
	);

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
					paddingBottom: { xs: "1em", sm: "5em", md: "1em" }, // Adding padding bottom for sm screen
					position: "relative", // Add position relative to enable absolute positioning of the cat image
				}}
			>
				<Box
					sx={{
						textAlign: { xs: "center", md: "left" },
						color: "#000",
						marginX: { xs: "5%", md: "10%", lg: "15%" },
					}}
				>
					<Typography
						variant={isSmallScreen ? "h2" : "h1"}
						component="h1"
						sx={{ mb: 2, fontWeight: 700 }}
					>
						Live your adventure
					</Typography>
					<Typography variant="body1" sx={{ mb: 2, color: "#6e6c65" }}>
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
						<Button
							variant="contained"
							href="/login"
							sx={{
								mr: 2,
								backgroundColor: "#FFB3A6",
								color: "#000",
								"&:hover, &:focus": {
									backgroundColor: "#FF977D",
								},
							}}
						>
							Try for Free
						</Button>
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
						top: { xs: "-9.5em", md: "13em" },
						display: { xs: "block", md: "block" },
						overflowX: "visible",
					}}
				>
					<img
						className="landingImage"
						src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Pan_Blue_Circle.png"
						alt=""
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default LandingPageCallToAction;

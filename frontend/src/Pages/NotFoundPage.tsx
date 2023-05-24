import React from "react";
import BasePageDesign from "./BasePageDesign";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../Components/LandingPage/NavbarLandingPage";

type Props = {};

const NotFoundPage = (props: Props) => {
	return (
		<BasePageDesign>
    <Navbar/>
			<Container
				maxWidth="sm"
				sx={{
					backgroundColor: "#fff",
					borderRadius: 2,
					padding: 5,
					boxShadow:
						"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // Box shadow style
					minHeight: 200,
					margin: 3,
				}}
			>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h6" sx={{ padding: 3 }}>
						Sorry this page does not exist
					</Typography>

					<Link to="/home">
					<Button
						variant="contained"
						sx={{
							mr: 2,
							backgroundColor: "#FFB3A6",
							color: "#000",
							"&:hover, &:focus": {
								backgroundColor: "#FF977D",
							},
						}}
					>
						Go Back home
					</Button>
					</Link>
				</Box>
			</Container>
			\{" "}
		</BasePageDesign>
	);
};

export default NotFoundPage;

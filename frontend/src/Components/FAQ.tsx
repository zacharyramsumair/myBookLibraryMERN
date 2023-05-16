import { Box, Container, Typography } from "@mui/material";
import React from "react";

type Props = {};

const FAQ = (props: Props) => {
	return (
		<Box
			sx={{
				pt: 10,
				outline: "red dashed 1px",
				width: "100vw",
				overflowX: "hidden",
			}}
		>
			<Container maxWidth="sm">
				<Typography variant="h3" component="h2">
					Frequently Asked Questions
				</Typography>

				<Typography variant="body1" component="p">
					If you have any further questions please contact us
				</Typography>
			</Container>
		</Box>
	);
};

export default FAQ;

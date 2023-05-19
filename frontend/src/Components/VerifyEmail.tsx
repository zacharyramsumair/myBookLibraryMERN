import React from "react";

import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

type Props = {};

const VerifyEmail = (props: Props) => {
	let onSuccess = true;
	let Loading = false;

	return (
		<Container
			maxWidth="sm"
			sx={{
				backgroundColor: "#fff",
				borderRadius: 2,
				padding: 5,
				boxShadow:
					"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // Box shadow style
				minHeight: 200,
				marginX: 3,
			}}
		>
			{Loading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: 200,
					}}
				>
					<CircularProgress />
				</Box>
			)}

			{!onSuccess && !Loading && (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h6" sx={{ padding: 1 }}>
						Opps... Something went wrong !
					</Typography>
					<Typography variant="h6" sx={{ padding: 1 }}>
						Please click the link provided in the email again.
					</Typography>
				</Box>
			)}

			{onSuccess && !Loading && (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h6" sx={{ padding: 3 }}>
						Email Verified
					</Typography>
					

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
						Login
					</Button>
				</Box>
			)}
		</Container>
	);
};

export default VerifyEmail;

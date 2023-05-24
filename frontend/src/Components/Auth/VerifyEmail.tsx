import React, { useEffect, useMemo } from "react";

import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useVerifyEmail } from "../../Hooks/Auth/useVerifyEmail";
import { useLocation } from "react-router-dom";
import ErrorWithResponse from "../../interfaces/ErrorWithReponse";

type Props = {};

const VerifyEmail = (props: Props) => {
	let {
		VerifyEmailFunction,
		error,
		data,
		isError,
		isLoading,
		isSuccess,
	} = useVerifyEmail();
	const location = useLocation();
	const queryParamsString = useMemo(() => location.search, [location.search]);
	const queryParams = useMemo(() => new URLSearchParams(queryParamsString), [
		queryParamsString,
	]);

	useEffect(() => {
		const email = queryParams.get("email");
		const verificationToken = queryParams.get("token");
		VerifyEmailFunction({ email, verificationToken });
	}, [queryParams, VerifyEmailFunction]);

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
				margin: 3,
			}}
		>
			{isLoading && (
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

			{isError && (
				// {!isSuccess && !isLoading && (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
					justifyContent="center"
				>
					<Typography variant="h6" sx={{ margin: 5 }}>
						{error
							? (error as ErrorWithResponse).response?.data?.message
							: "An Error Occurred"}{" "}
					</Typography>
				</Box>
			)}

			{isSuccess && !isLoading && (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h6" sx={{ padding: 3 }}>
						{data && data.msg}
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

import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	CircularProgress,
	Divider,
} from "@mui/material";
import { z } from "zod";
import { useLoginUser } from "../../Hooks/Auth/useLoginUser";
import { UserContext } from "./../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorWithResponse from "../../interfaces/ErrorWithReponse";
// import Cookies from "js-cookie";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
	let {
		loginUser,
		error,
		data,
		isError,
		isLoading,
		isSuccess,
	} = useLoginUser();

	let { user, setUser, fetchUser } = useContext(UserContext);
	let navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}

		if (isSuccess) {
			// setUser(data);
			fetchUser();
			// Cookies.set("user", JSON.stringify(data), { secure: true, sameSite: "strict" });
			navigate("/");
		}
	}, [isSuccess]);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		// console.log(data);
		loginUser(data);
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				backgroundColor: "#fff",
				borderRadius: 2,
				padding: 5,
				boxShadow:
					"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // Box shadow style
				margin: 3,
				// boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)", // Box shadow style
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

			{!isLoading && (
				<>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Typography variant="h4" align="center" gutterBottom>
							Login
						</Typography>

						{isError && (
							<Typography
								variant="body2"
								align="center"
								sx={{ color: "#ff3333" }}
								gutterBottom
							>
								{error
									? (error as ErrorWithResponse).response?.data
											?.message
									: "An Error Occurred"}
							</Typography>
						)}

						<Box marginBottom={2}>
							<Typography>Email</Typography>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										variant="outlined"
										fullWidth
										margin="normal"
										error={!!errors.email}
										helperText={errors.email?.message}
									/>
								)}
							/>
						</Box>

						<Box marginBottom={2}>
							<Typography>Password</Typography>
							<Controller
								name="password"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										variant="outlined"
										fullWidth
										type="password"
										margin="normal"
										error={!!errors.password}
										helperText={errors.password?.message}
									/>
								)}
							/>
						</Box>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
						>
							Login
						</Button>
					</form>

					<Box sx={{ marginY: 3 }}>
						<Typography variant="body2">
							{" "}
							Don't have an account?{" "}
							<Typography
								onClick={() => navigate("/register")}
								variant="body2"
								component={"span"}
								sx={{ color: "#3366CC", cursor: "pointer" }}
							>
								Register here.
							</Typography>{" "}
						</Typography>
					</Box>

					<Divider />
					<Box sx={{ marginTop: 3 }}>
						<Typography variant="body2">Demo Account :</Typography>
						<Typography variant="body2">
							Email - blocksDemoAccount123@gmail.com{" "}
						</Typography>
						<Typography variant="body2">
							Password - blocksDemoAccount123@gmail.com{" "}
						</Typography>
					</Box>
				</>
			)}
		</Container>
	);
};

export default LoginForm;

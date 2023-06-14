import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { z } from "zod";
import { CheckCircle } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useRegisterUser } from "../../Hooks/Auth/useRegisterUser";
import ErrorWithResponse from "../../interfaces/ErrorWithReponse";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
// // Define a custom type for the error object
// // Define a custom type for the error object
// interface MyError<T = any> extends AxiosError<T> {
//   response?: AxiosResponse<T>;
// }

const schema = z
	.object({
		name: z.string().nonempty("Name is required"),
		email: z.string().email(),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters long")
			.regex(
				/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
				"Password must contain at least one number, one uppercase letter, and one symbol"
			),
		confirmPassword: z
			.string()
			.min(6, "Confirm password must be at least 6 characters long"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type FormValues = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {

	let { user } = useContext(UserContext);
	let navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate("/home");
		}

		
	}, []);

	const {
		registerUser,
		error,
		data,
		isError,
		isLoading,
		isSuccess,
	} = useRegisterUser();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
		registerUser(data);
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

			{!isSuccess && !isLoading && (
				<>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Typography variant="h4" align="center" gutterBottom>
						Register
					</Typography>

					{isError && (
						<Typography
							variant="body2"
							align="center"
							sx={{ color: "#ff3333" }}
							gutterBottom
						>
							{error
								? (error as ErrorWithResponse).response?.data?.message
								: "An Error Occurred"}
						</Typography>
					)}

					<Box marginBottom={0}>
						<Typography>Name</Typography>
						<Controller
							name="name"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errors.name}
									helperText={errors.name?.message || " "}
								/>
							)}
						/>
					</Box>

					<Box marginBottom={0}>
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
									helperText={errors.email?.message || " "}
								/>
							)}
						/>
					</Box>

					<Box marginBottom={0}>
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
									helperText={errors.password?.message || " "}
								/>
							)}
						/>
					</Box>

					<Box marginBottom={0}>
						<Typography>Confirm Password</Typography>
						<Controller
							name="confirmPassword"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									variant="outlined"
									fullWidth
									type="password"
									margin="normal"
									error={!!errors.confirmPassword}
									helperText={errors.confirmPassword?.message || " "}
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
						Register
					</Button>
				</form>
				<Box sx={{ marginTop: 3 }}>
						<Typography variant="body2">
							
							Already have an account?{" "}
							<Typography
								onClick={() => navigate("/login")}
								variant="body2"
								component={"span"}
								sx={{ color: "#3366CC", cursor:"pointer" }}
							>
								Login here.
							</Typography>
						</Typography>
					</Box>
				</>
			)}

			{isSuccess && !isLoading && (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h6" sx={{ padding: 3 }}>
						Please check your inbox to verify your account.
					</Typography>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						width={65}
						height={65}
						borderRadius="50%"
						bgcolor="#4BB543"
						marginBottom={2}
					>
						<CheckCircle fontSize="large" style={{ color: "#fff" }} />
					</Box>
				</Box>
			)}
		</Container>
	);
};

export default RegisterForm;

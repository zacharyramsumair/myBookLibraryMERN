import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { z } from "zod";
import { CheckCircle } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
type Props = {};

const schema = z
	.object({
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
	.refine((data) => data.password == data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
type FormValues = z.infer<typeof schema>;

const ResetPasswordForm = (props: Props) => {
	let onSuccess = true;
	let Loading = false;

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<Typography variant="h4" align="center" gutterBottom>
						Reset Password
					</Typography>

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
						Set New Password
					</Button>
				</form>
			)}

			{onSuccess && !Loading && (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h6" sx={{ padding: 3 }}>
						Password Changed
					</Typography>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						width={50}
						height={50}
						borderRadius="50%"
						bgcolor="#4BB543"
						marginBottom={3}
					>
						<CheckCircle fontSize="large" style={{ color: "#fff" }} />
					</Box>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						marginBottom={2}
					>
						<Button
							variant="contained"
							href="/login"
							sx={{
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
				</Box>
			)}
		</Container>
	);
};

export default ResetPasswordForm;

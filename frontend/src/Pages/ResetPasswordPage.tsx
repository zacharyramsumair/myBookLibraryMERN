import React from "react";
import { Box } from "@mui/material";
import backgroundImage from "../assets/background.svg";
import ResetPasswordForm from "../Components/ResetPasswordForm";

type Props = {};

const ResetPasswordPage = (props: Props) => {
	return (
		<Box
			sx={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ResetPasswordForm />
		</Box>
	);
};

export default ResetPasswordPage;

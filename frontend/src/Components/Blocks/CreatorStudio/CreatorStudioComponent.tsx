import React from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetMoneyEarned } from "../../../Hooks/Auth/useGetMoneyEarned";

type Props = {};

const DashboardComponent = (props: Props) => {
	let navigate = useNavigate();

	let { isLoading, error, data, refetch } = useGetMoneyEarned();

	if (isLoading) {
		return (
			<BlockFraming hideSearch={false}>
				<Box sx={{ paddingX: 4 }}>
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
				</Box>
			</BlockFraming>
		);
	}


	return (
		<BlockFraming hideSearch={true}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					height: "100%",
					padding: "2rem",
					position: "relative",
				}}
			>
				<Box sx={{ position: "absolute", top: "1em", right: "1em" }}>
					<Typography>
						Money Earned:{" "}
						<Typography sx={{ fontWeight: "bold" }} component={"span"}>
							{/* ${data.moneyEarnedInCents/100} */}
							${(data.moneyEarnedInCents / 100).toFixed(2)}
						</Typography>
					</Typography>
				</Box>
				<Box
					sx={{
						backgroundImage:
							"linear-gradient(to right, #FFC0CB, #FF1493)",
						padding: "2rem",
						marginY: "2rem",
						textAlign: "center",
						width: "100%",
						maxWidth: "800px",
						borderRadius: 2,
						boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
						color: "white",
						cursor: "pointer",
					}}
					onClick={() => navigate("/myBlocks")}
				>
					<Typography variant="h4">View my Blocks</Typography>
				</Box>
				<Box
					sx={{
						backgroundImage:
							"linear-gradient(to right, #87CEEB, #1E90FF)",
						padding: "2rem",
						textAlign: "center",
						width: "100%",
						maxWidth: "800px",
						borderRadius: 2,
						boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
						color: "white",
						cursor: "pointer",
					}}
					onClick={() => navigate("/create")}
				>
					<Typography variant="h4">Create a New Block</Typography>
				</Box>
			</Box>
		</BlockFraming>
	);
};

export default DashboardComponent;

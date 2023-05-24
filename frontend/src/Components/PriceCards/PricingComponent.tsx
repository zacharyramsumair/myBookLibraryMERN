import { CheckCircle } from "@mui/icons-material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import {
	Container,
	Typography,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Button,
	Grid,
	Checkbox,
	Box,
	useMediaQuery,
	Theme,
	Divider,
} from "@mui/material";
import React from "react";
import PricingDetails from "../../assets/PricingDetails";
import { Link } from "react-router-dom";

type Props = {};

const PricingComponent = (props: Props) => {
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);

	let FreeFeatures = PricingDetails.free.map((detail, index) => {
		return (
			<ListItem key={index}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					marginRight={1}
				>
					{detail.included ? (
						<CheckCircle fontSize="small" style={{ color: "#fff" }} />
					) : (
						<CircleOutlinedIcon
							fontSize="small"
							style={{ color: "#fff" }}
						/>
					)}
				</Box>
				<ListItemText primary={detail.feature} />
			</ListItem>
		);
	});

	let StandardFeatures = PricingDetails.standard.map((detail, index) => {
		return (
			<ListItem key={index}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					marginRight={1}
				>
					{detail.included ? (
						<CheckCircle fontSize="small" style={{ color: "#fff" }} />
					) : (
						<CircleOutlinedIcon
							fontSize="small"
							style={{ color: "#fff" }}
						/>
					)}
				</Box>
				<ListItemText primary={detail.feature} />
			</ListItem>
		);
	});

	let PremiumFeatures = PricingDetails.premium.map((detail, index) => {
		return (
			<ListItem key={index}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					marginRight={1}
				>
					{detail.included ? (
						<CheckCircle fontSize="small" style={{ color: "#fff" }} />
					) : (
						<CircleOutlinedIcon
							fontSize="small"
							style={{ color: "#fff" }}
						/>
					)}
				</Box>
				<ListItemText primary={detail.feature} />
			</ListItem>
		);
	});

	return (
		<Container
			// maxWidth="lg"
			maxWidth={isSmallScreen ? "xs" : "lg"}
			sx={{
				backgroundColor: "#fff",
				borderRadius: 2,
				padding: 5,
				// paddingTop: { sm: "80px" },
				// paddingTop: { sm: "70px", md: "70px" },
				// marginTop: { sm: "80px", md: "64px"  },

				boxShadow:
					"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				marginX: 3,
				marginY: isSmallScreen ? 10 : 15,
			}}
		>
			{/* <Typography variant="h4" align="center">
				Pricing
			</Typography> */}

			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<Card
						sx={{
							width: "100%",
							marginBottom: { xs: "1.5em", md: "0" },
							// minHeight:"300px",

							backgroundColor: "#B315EC",
							color: "#fff",
						}}
					>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									my: "1em",
								}}
							>
								<Typography
									variant="h6"
									sx={{
										padding: "0.5em 1em",
										backgroundColor: "#fff",
										color: "#B315EC",
										borderRadius: "2em",
										width: "fit-content",
										textAlign: "center",
									}}
								>
									Free Tier
								</Typography>
							</Box>

							<Typography
								variant="body1"
								sx={{ textAlign: "center", mb: "1em" }}
							>
								The perfect place to start.
							</Typography>
							<Divider />
							<List dense sx={{ marginBottom: "auto" }}>
								{FreeFeatures}
							</List>

							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									padding: "1em",
								}}
							>
								<Typography
									variant="h4"
									// sx={{ textAlign: "center", mb: "1em" }}
								>
									$0.00
								</Typography>
								<Typography variant="h6">/month</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Link to="#">
									<Button
										variant="contained"
										sx={{
											backgroundColor: "#fff",
											color: "#B315EC",
											fontWeight: "700",
											width: "50%",
										}}
									>
										Get started
									</Button>
								</Link>
							</Box>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card
						sx={{
							width: "100%",
							marginBottom: { xs: "1.5em", md: "0" },
							// minHeight:"300px",

							backgroundColor: "#ED1593",
							color: "#fff",
						}}
					>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									my: "1em",
								}}
							>
								<Typography
									variant="h6"
									sx={{
										padding: "0.5em 1em",
										backgroundColor: "#fff",
										color: "#ED1593",
										borderRadius: "2em",
										width: "fit-content",
										textAlign: "center",
									}}
								>
									Standard Tier
								</Typography>
							</Box>
							<Typography
								variant="body1"
								sx={{ textAlign: "center", mb: "1em" }}
							>
								Most popular tier. Perfect for the user who just wants
								to read everything.
							</Typography>
							<Divider />
							<List dense>{StandardFeatures}</List>

							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									padding: "1em",
								}}
							>
								<Typography
									variant="h4"
									// sx={{ textAlign: "center", mb: "1em" }}
								>
									$9.99
								</Typography>
								<Typography variant="h6">/month</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Link to="#">
									<Button
										variant="contained"
										sx={{
											backgroundColor: "#fff",
											color: "#ED1593",
											fontWeight: "700",
											width: "50%",
										}}
									>
										Get started
									</Button>
								</Link>
							</Box>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card
						sx={{
							width: "100%",
							marginBottom: { xs: "1.5em", md: "0" },
							// minHeight:"300px",
							backgroundColor: "#1681ED",
							color: "#fff",
						}}
					>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									my: "1em",
								}}
							>
								<Typography
									variant="h6"
									sx={{
										padding: "0.5em 1em",
										backgroundColor: "#fff",
										color: "#1681ED",
										borderRadius: "2em",
										width: "fit-content",
										textAlign: "center",
									}}
								>
									Premium Tier
								</Typography>
							</Box>
							<Typography
								variant="body1"
								sx={{ textAlign: "center", mb: "1em" }}
							>
								Best option for creators and influencers.
							</Typography>
							<Divider />
							<List dense sx={{ marginBottom: "auto" }}>
								{PremiumFeatures}
							</List>

							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									padding: "1em",
								}}
							>
								<Typography
									variant="h4"
									// sx={{ textAlign: "center", mb: "1em" }}
								>
									$19.99
								</Typography>
								<Typography variant="h6">/month</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Link to="#">
									<Button
										variant="contained"
										sx={{
											backgroundColor: "#fff",
											color: "#1681ED",
											fontWeight: "700",
											width: "50%",
										}}
									>
										Get started
									</Button>
								</Link>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default PricingComponent;
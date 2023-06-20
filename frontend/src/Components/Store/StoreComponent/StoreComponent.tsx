import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Modal,
	Paper,
	Grid,
	Card,
} from "@mui/material";
import { toast } from "react-toastify";
import BlockFraming from "../../Blocks/BlockFraming/BlockFraming";
import { useNavigate } from "react-router-dom";
import PricingComponent from "../../PriceCards/PricingComponent";

const StoreComponent = () => {
	let navigate = useNavigate();

	return (
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<Paper
					sx={{ padding: 1, display: "flex", justifyContent: "center" }}
				>
					<Typography variant="h4">Store</Typography>
				</Paper>

				<Box
					className="storeTiers"
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<PricingComponent />
				</Box>

				{/* <Box className="storeBuyGems">
					<Paper
						sx={{ padding: 1, display: "flex", justifyContent: "center" }}
					>
						<Typography variant="h5">Gems</Typography>
					</Paper>
				</Box> */}

				<Box className="storeBuyGems">
					<Paper
						sx={{ padding: 1, display: "flex", justifyContent: "center" }}
					>
						<Typography variant="h5">Gems</Typography>
					</Paper>

					<Grid container spacing={1} sx={{ marginTop: 1 }}>
						<Grid item xs={4} sx={{ marginTop: 1 }}>
							<Card>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography
										variant="body1"
										sx={{ textAlign: "center", marginTop: 1 }}
									>
										Handfull of Gems
									</Typography>
									<img
										src="https://store.supercell.com/images/brawlstars/5b359823b45a89eb468465c318290150.png"
										alt=""
										style={{ width: "100%" }}
									/>
									<Typography variant="body1" sx={{ textAlign: "center", marginBottom: 1 }}>$1.99</Typography>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={4} sx={{ marginTop: 1 }}>
							<Card>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography
										variant="body1"
										sx={{ textAlign: "center", marginTop: 1 }}
									>
										Pouch of Gems
									</Typography>
									<img
										src="https://store.supercell.com/images/clashroyale/d94bbe2102d77b7e39347d011da86b8f.png"
										alt=""
										style={{ width: "100%" }}
									/>
									<Typography variant="body1" sx={{ textAlign: "center", marginBottom: 1 }}>$10.99</Typography>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={4} sx={{ marginTop: 1 }}>
							<Card>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography
										variant="body1"
										sx={{ textAlign: "center", marginTop: 1 }}
									>
										Bucket of Gems
									</Typography>
									<img
										src="https://store.supercell.com/images/clashroyale/c7195e16e40f60dba67d4233375b0e34.png"
										alt=""
										style={{ width: "100%" }}
									/>
									<Typography variant="body1" sx={{ textAlign: "center", marginBottom: 1 }}>$49.99</Typography>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</BlockFraming>
	);
};

export default StoreComponent;

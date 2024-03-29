import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Modal,
	Paper,
	Grid,
	Card,
	CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import BlockFraming from "../../Blocks/BlockFraming/BlockFraming";
import { useNavigate } from "react-router-dom";
import PricingComponent from "../../PriceCards/PricingComponent";
import { useGetProducts } from "../../../Hooks/Stripe/getAllProducts";
import { useCreateStripeSession } from "../../../Hooks/Stripe/useCreateStripeSession";
import { UserContext } from "../../../Contexts/UserContext";

import handfullOfGems from "../../../assets/handfullOfGems.png";
import pouchOfGems from "../../../assets/pouchOfGems.png";
import bucketOfGems from "../../../assets/bucketOfGems.png";

const StoreComponent = () => {
	let navigate = useNavigate();
	let { user, setUser, fetchUser } = useContext(UserContext);

	let [products, setProducts] = useState([
		{
			nickname: "",
			price: 0,
			unit_amount: 0,
			recurring: null,
			id: "1",
			product: "",
		},
		{
			nickname: "",
			price: 0,
			unit_amount: 0,
			recurring: null,
			id: "2",
			product: "",
		},
		{
			nickname: "",
			price: 0,
			unit_amount: 0,
			recurring: null,
			id: "3",
			product: "",
		},
		{
			nickname: "",
			price: 0,
			unit_amount: 0,
			recurring: null,
			id: "4",
			product: "",
		},
		{
			nickname: "",
			price: 0,
			unit_amount: 0,
			recurring: null,
			id: "5",
			product: "",
		},
		{
			nickname: "",
			price: 0,
			unit_amount: 0,
			recurring: null,
			id: "6",
			product: "",
		},
		{
			nickname: "",
			price: 0,
			unit_amount: 0,
			recurring: null,
			id: "7",
			product: "",
		},
	]);

	let { data, error, isLoading, isError } = useGetProducts();
	let {
		createStripeSession,
		errorCreateStripeSession,
		dataCreateStripeSession,
		isErrorCreateStripeSession,
		isLoadingCreateStripeSession,
		isSuccessCreateStripeSession,
	} = useCreateStripeSession();

	useEffect(() => {
		if (data) {
			// console.log(data.data);
			setProducts(data.data);
		}
	}, [data]);

	useEffect(() => {
		if (dataCreateStripeSession && isSuccessCreateStripeSession) {
			// console.log(dataCreateStripeSession.url);
			window.location.href = dataCreateStripeSession.url;
		}
	}, [dataCreateStripeSession, isSuccessCreateStripeSession]);

	// const createStripSession = (priceId)

	const handleNotLoggedIn = () => {
		navigate("/login");

		toast.error("You must be logged in to make a purchase", {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	if (isLoading || isLoadingCreateStripeSession) {
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
			<Box sx={{ padding: "0 0 0 4" }}>
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
					<PricingComponent
						products={products}
						createStripeSession={createStripeSession}
						handleNotLoggedIn={handleNotLoggedIn}
					/>
				</Box>

				<Box className="storeBuyGems">
					<Paper
						sx={{ padding: 1, display: "flex", justifyContent: "center" }}
					>
						<Typography variant="h5">Gems</Typography>
					</Paper>

					<Grid container spacing={1} sx={{ marginTop: 1 }}>
						<Grid item xs={4} sx={{ marginTop: 1 }}>
							<Card
								onClick={() =>
									user
										? createStripeSession({
												priceId: products[2].id,
												mode:
													products[2].recurring == null
														? "payment"
														: "subscription",
												productId: products[2].product,
										  })
										: handleNotLoggedIn()
								}
							>
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
										{/* Handfull of Gems */}
										{data && products[2].nickname}{"  "}
										<Typography
											variant="h6"
											component={"span"}
											sx={{
												color: "#21D02B",
											}}
										>
											(5)
										</Typography>
									</Typography>

									<Box>
										<img
											// src="https://store.supercell.com/images/brawlstars/5b359823b45a89eb468465c318290150.png"
											src={handfullOfGems}
											crossOrigin="anonymous"
											alt=""
											style={{ width: "100%" }}
										/>
									</Box>
									<Typography
										variant="body1"
										sx={{ textAlign: "center", marginBottom: 1 }}
									>
										{/* $1.99 */}$
										{data && products[2].unit_amount / 100}
									</Typography>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={4} sx={{ marginTop: 1 }}>
							<Card
								onClick={() =>
									user
										? createStripeSession({
												priceId: products[1].id,
												mode:
													products[1].recurring == null
														? "payment"
														: "subscription",
												productId: products[1].product,
										  })
										: handleNotLoggedIn()
								}
							>
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
										{/* Pouch of Gems */}
										{data && products[1].nickname}{"  "}
										<Typography
											variant="h6"
											component={"span"}
											sx={{
												color: "#21D02B",
											}}
										>
											(20)
										</Typography>
									</Typography>
									<Box>
										<img
											// src="https://store.supercell.com/images/brawlstars/5b359823b45a89eb468465c318290150.png"
											src={pouchOfGems}
											crossOrigin="anonymous"
											alt=""
											style={{ width: "100%" }}
										/>
									</Box>
									<Typography
										variant="body1"
										sx={{ textAlign: "center", marginBottom: 1 }}
									>
										{/* $10.99 */}$
										{data && products[1].unit_amount / 100}
									</Typography>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={4} sx={{ marginTop: 1 }}>
							<Card
								onClick={() =>
									user
										? createStripeSession({
												priceId: products[0].id,
												mode:
													products[0].recurring == null
														? "payment"
														: "subscription",
												productId: products[0].product,
										  })
										: handleNotLoggedIn()
								}
							>
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
										{/* Bucket of Gems */}
										{data && products[0].nickname}{"  "}
										<Typography
											variant="h6"
											component={"span"}
											sx={{
												color: "#21D02B",
											}}
										>
											(50)
										</Typography>
									</Typography>
									<Box>
										<img
											// src="https://store.supercell.com/images/brawlstars/5b359823b45a89eb468465c318290150.png"
											src={bucketOfGems}
											crossOrigin="anonymous"
											alt=""
											style={{ width: "100%" }}
										/>
									</Box>
									<Typography
										variant="body1"
										sx={{ textAlign: "center", marginBottom: 1 }}
									>
										{/* $49.99 */}$
										{data && products[0].unit_amount / 100}
									</Typography>
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

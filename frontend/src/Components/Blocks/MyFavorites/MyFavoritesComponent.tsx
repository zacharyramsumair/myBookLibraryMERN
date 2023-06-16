import React, { useEffect, useState } from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import {
	Box,
	Button,
	Typography,
	Grid,
	Paper,
	CircularProgress,
} from "@mui/material";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import OurCard from "../ImageCarousel/OurCard";
// import data from "../sampleBlocks";
import { UserContext } from "../../../Contexts/UserContext";
import { useLocation } from "react-router-dom";
import { useGetFavorites } from "../../../Hooks/Blocks/useGetFavorites";

type Props = {};

const MyFavoritesComponent = (props: Props) => {
	const { user, setUser } = React.useContext(UserContext);

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const page = queryParams.get("page") || "1";
	const limit = queryParams.get("limit") || "10";

	let favoritesParameters = {
		page,
		limit,
	};

	const [totalPages, setTotalPages] = useState(10);

	let { isLoading, error, data, refetch } = useGetFavorites(
		favoritesParameters
	);

	useEffect(() => {
		if (data) {
			console.log(data);
			setTotalPages(data.totalPages);
		}
	}, [data]);

	useEffect(() => {
		refetch();
	}, [page, limit]);

	if (!user) {
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<Typography variant="h4">You must be logged in</Typography>

			</Box>
		</BlockFraming>;
	}

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

	const cardElements = data.blocks.map((item:any) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
				<Paper elevation={4}>
					<OurCard item={item} key={item._id} />
				</Paper>
			</Grid>
		);
	});

	return (
		<BlockFraming hideSearch={false}>
			<Box sx={{ padding: 4 }}>
				<Typography variant="h4">Favorites</Typography>

				<Grid container spacing={2} sx={{ marginTop: 2 }}>
					{cardElements}
				</Grid>

				<PaginationButtons
					totalPages={totalPages}
					page={Number(page)}
					route="favorites"
				/>
			</Box>
		</BlockFraming>
	);
};

export default MyFavoritesComponent;

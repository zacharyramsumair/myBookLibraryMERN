import React from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import { Box, CircularProgress, Typography } from "@mui/material";
import QuoteofTheDay from "./QuoteofTheDay";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { useGetDashboard } from "../../../Hooks/Blocks/useGetDashboard";

type Props = {};

const DashboardComponent = (props: Props) => {
	let { data, error, isLoading, isError } = useGetDashboard();
	// console.log(data)

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
		<BlockFraming hideSearch={false}>
			<Box sx={{ paddingX: 4 }}>
				{/* quote and new arrivals */}
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<QuoteofTheDay
						quote={data.quote.quote}
						source={data.quote.source}
					/>
					<ImageCarousel
						fullRow={false}
						headerText="New Arrivals"
						align="center"
						listOfImages={data.newArrivals}
					/>
				</Box>

				{/* Recommended for you */}
				<Box>
					<ImageCarousel
						fullRow={true}
						headerText="Recommended for You"
						align="left"
						listOfImages={data.recommendedBlocks}

					/>
				</Box>
			</Box>
		</BlockFraming>
	);
};

export default DashboardComponent;

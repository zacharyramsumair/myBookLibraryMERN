import React from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import { Box, Typography } from "@mui/material";
import QuoteofTheDay from "./QuoteofTheDay";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

type Props = {};

const DashboardComponent = (props: Props) => {
	return (
		<BlockFraming>
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
					<QuoteofTheDay />
					<ImageCarousel fullRow={false} headerText="New Arrivals" align="center" />
				</Box>

				{/* Recommended for you */}
				<Box>
				<ImageCarousel fullRow={true} headerText="Recommended for You" align="left" />
				</Box>
			</Box>
		</BlockFraming>
	);
};

export default DashboardComponent;

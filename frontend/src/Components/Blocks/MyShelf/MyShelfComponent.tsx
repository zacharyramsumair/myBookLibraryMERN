import React, { useState } from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import OurCard from "../ImageCarousel/OurCard";
import data from "../sampleBlocks";

type Props = {};

const MyShelfComponent = (props: Props) => {
	const cardElements = data.map((item) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
				<Paper elevation={4}>
					<OurCard item={item} key={item.id} />
				</Paper>
			</Grid>
		);
	});

	return (
		<BlockFraming hideSearch={false}>
			<Box sx={{ padding: 4 }}>
				<Typography variant="h4">My Shelf</Typography>

				<Grid container spacing={2} sx={{ marginTop: 2 }}>
					{cardElements}
				</Grid>

				<PaginationButtons />
			</Box>
		</BlockFraming>
	);
};

export default MyShelfComponent;

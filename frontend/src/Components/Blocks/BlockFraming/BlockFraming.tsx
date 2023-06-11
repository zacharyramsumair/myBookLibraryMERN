import React, { ReactNode, useState } from "react";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import FramingLeft from "./FramingLeft";
import FramingRight from "./FramingRight";
import FramingRightTopBand from "./FramingRightTopBand";

type Props = {
	children:ReactNode,
	hideSearch:boolean
};

const BlockFraming = (props: Props) => {

	return (
		<Container
		className="removePadding"
			maxWidth="lg"
			sx={{
				backgroundColor: "#fff",
				borderRadius: 2,
				boxShadow:
					"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				minHeight: 200,
				maxHeight: "90vh",
				margin: 3,
			}}
		>
			<Grid container>
				<FramingLeft  />

				<FramingRight>
					<Grid
						className="hideScrollbar"
						item
						xs={12}
						md={10}
						sx={{
							backgroundColor: "#F3F3F7",
							// backgroundColor: "lightgray",
							height: "90vh",
							overflow: "hidden",
							overflowY: "scroll",
							borderTopLeftRadius: { xs: 10, md: 0 },
							borderBottomLeftRadius: { xs: 10, md: 0 },
							borderTopRightRadius: 10,
							borderBottomRightRadius: 10,
						}}
					>
						<FramingRightTopBand hideSearch={props.hideSearch} />
						{props.children}
					</Grid>
				</FramingRight>
			</Grid>
		</Container>
	);
};

export default BlockFraming;

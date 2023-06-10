import * as React from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Styles from "./ImageCarousel.module.css";

type Props = {
	item: {
		id: number;
		image: string;
		title: string;
		rating: number;
	};
	key: number;
};
export default function OurCard(props: Props) {
	return (
		<Card
			sx={{
				height: "14em",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				// justifyContent: "space-around",
				background: "transparent",
				boxShadow: "none",
			}}
		>
			<Box component="div" marginTop={2}>
				<img
					src={props.item.image}
					className={Styles.cardImage}
					loading="lazy"
					alt={props.item.title}
				/>
			</Box>
			<CardContent sx={{ margin: "auto" }}>
				<Typography variant="subtitle2">{props.item.title}</Typography>
			</CardContent>
		</Card>
	);
}

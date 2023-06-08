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
        background:"transparent",
        boxShadow:"none"
			}}
      
		>
			<Box
				component="div"
        sx={{marginTop:1}}
			>
				<img
					src={props.item.image}
					className={Styles.cardImage}
					loading="lazy"
					alt=""
				/>
			</Box>
			<CardContent sx={{ margin:"auto" }}>
				<Typography variant="subtitle2">{props.item.title}</Typography>
				{/* <Typography variant="subtitle2" sx={{minHeight:"3.5em"}}>{props.item.rating}</Typography> */}
				{/* <Typography startDecorator={<LocationOnRoundedIcon />} textColor="neutral.300">
          California, USA
        </Typography> */}
			</CardContent>
		</Card>
	);
}

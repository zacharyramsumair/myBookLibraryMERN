import * as React from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Styles from "./ImageCarousel.module.css";
import { IBlockForImageCarousel } from "./ImageCarousel";
import DiamondIcon from "@mui/icons-material/Diamond";
import { useNavigate } from "react-router-dom";

type Props = {
	item: IBlockForImageCarousel;
	key: string;
};

export default function OurCard(props: Props) {
	const isPaidTier = props.item.tier == "paid";

	let navigate = useNavigate()

	return (
		<Card
			sx={{
				height: "14em",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				background: "transparent",
				boxShadow: "none",
				cursor:"pointer"
			}}

			onClick={()=>navigate(`/block/${props.item._id}`)}
		>
			
			<Box component="div" marginTop={2} sx={{position:"relative"}}>
				<img
					src={props.item.imageUrl}
					className={Styles.cardImage}
					loading="lazy"
					alt={props.item.title}
				/>
				{isPaidTier && (
				<Box
					component="div"
					sx={{ position: "absolute", top: 3, right: 3 }}
				>
					{/* <DiamondIcon sx={{color:"#FFD700"}} /> */}
					<svg className={Styles.crownSVG} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M7.51 4.87C7.01 6.27 6.45 6.95 5.94 7c-.57.07-1.07-.18-1.54-.8a.54.54 0 0 0-.1-.1 1 1 0 1 0-.8.4l.01.12.82 3.24A1.5 1.5 0 0 0 5.78 11h4.44a1.5 1.5 0 0 0 1.45-1.14l.82-3.24a.54.54 0 0 0 .01-.12 1 1 0 1 0-.8-.4.54.54 0 0 0-.1.09c-.49.62-1 .87-1.54.81-.5-.05-1.04-.74-1.57-2.13a1 1 0 1 0-.98 0zM11 11.75a.5.5 0 1 1 0 1H5a.5.5 0 1 1 0-1h6z"></path></svg>
				</Box>

				
			)}
			</Box>
			<CardContent sx={{ margin: "auto" }}>
				<Typography variant="subtitle2" sx={{textAlign:'center'}}>{props.item.title}</Typography>
			</CardContent>
		</Card>
	);
}

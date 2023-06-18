import React from "react";
import OurCard from "./OurCard";
import Slider from "react-slick";
// import Styles from "./ImageCarousel.module.css";
// import "./ImageCarousel.module.css";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import data from "../sampleBlocks";

export interface IBlockForImageCarousel{
	imageUrl:string,
	title:string,
	_id:string,
	tier:"free" | "paid",
	rating ?:number,
	views ?:number,
}

type Props = {
	fullRow: boolean;
	headerText: string;
	align: string;
	listOfImages:IBlockForImageCarousel[]
	// hideDots?:boolean;
};

const ImageCarousel = (props: Props) => {
	const slider = React.useRef(null);

	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);
	const isExtraSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm")
	);

	let numberOfSlidesToShow: number = props.listOfImages.length < 2 ? props.listOfImages.length : 2;
	if (props.fullRow) {
		if (isExtraSmallScreen) {
			numberOfSlidesToShow = props.listOfImages.length < 2 ? props.listOfImages.length : 2;;
		} else if (isSmallScreen) {
			numberOfSlidesToShow = props.listOfImages.length < 4 ? props.listOfImages.length : 4;
		} else {
			numberOfSlidesToShow = props.listOfImages.length < 4 ? props.listOfImages.length : 4;
		}
	} else {
		if (isExtraSmallScreen) {
			numberOfSlidesToShow = 1;
		} else if (isSmallScreen) {
			numberOfSlidesToShow = props.listOfImages.length < 2 ? props.listOfImages.length : 2;
		} else {
			numberOfSlidesToShow = props.listOfImages.length < 3 ? props.listOfImages.length : 3;
		}
	}

	const settings = {
		dots: false ,
		// dots: props.hideDots ? false :true ,
		infinite: true,
		arrows: true,
		speed: 100,
		slidesToShow: numberOfSlidesToShow,
		slidesToScroll: 1,
	};

	return (
		<>
			<Box
				sx={{
					width: {
						xs: props.fullRow ? "95%" : "80%",
						md: props.fullRow ? "95%" : "60%",
					},
					padding: 2,
					display: "inline",
				}}
			>
				<Typography
					variant="h6"
					sx={{ textAlign: props.align == "center" ? "center" : "left" }}
				>
					{props.headerText}
				</Typography>
				<Slider ref={slider} {...settings}>
					{props.listOfImages.map((item, index) => (
					// {data.slice(0, 10)?.map((item, index) => (
						<OurCard item={item} key={item._id} />
					))}
				</Slider>
			</Box>
		</>
	);
};

export default ImageCarousel;

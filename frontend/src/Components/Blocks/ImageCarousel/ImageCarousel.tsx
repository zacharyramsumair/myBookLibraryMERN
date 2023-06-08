import React from "react";
import OurCard from "./OurCard";
import Slider from "react-slick";
import Styles from "./ImageCarousel.module.css";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import data from "../sampleBlocks";

type Props = {
	fullRow: boolean;
	headerText: string;
	align: string;
};

const ImageCarousel = (props: Props) => {
	const slider = React.useRef(null);

	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);
	const isExtraSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm")
	);

	let numberOfSlidesToShow: number = 3;
	if (props.fullRow) {
		if (isExtraSmallScreen) {
			numberOfSlidesToShow = 2;
		} else if (isSmallScreen) {
			numberOfSlidesToShow = 4;
		} else {
			numberOfSlidesToShow = 5;
		}
	} else {
		if (isExtraSmallScreen) {
			numberOfSlidesToShow = 1;
		} else if (isSmallScreen) {
			numberOfSlidesToShow = 2;
		} else {
			numberOfSlidesToShow = 3;
		}
	}

	const settings = {
		dots: true,
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
						xs: props.fullRow ? "100%" : "80%",
						md: props.fullRow ? "100%" : "60%",
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
					{data?.map((item, index) => (
						<OurCard item={item} key={index} />
					))}
				</Slider>
			</Box>
		</>
	);
};

export default ImageCarousel;

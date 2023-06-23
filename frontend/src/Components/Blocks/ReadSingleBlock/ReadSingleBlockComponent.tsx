import React, { useEffect, useState } from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useGetSingleBlock } from "../../../Hooks/Blocks/useGetSingleBlock";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBuyBlock } from "../../../Hooks/Blocks/useBuyBlock";
import { Refresh } from "@mui/icons-material";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { usePostFavorite } from "../../../Hooks/Blocks/usePostFavorite";
import Rating from "@mui/material/Rating";
import { useAddRating } from "../../../Hooks/Blocks/useAddRating";
import gemImage from "../,,/../../../assets/gem.png";
import allTags from "../allTags";

type Props = {
	// book: {
	// 	image: string;
	// 	title: string;
	// 	rating: number;
	// 	author: string;
	// 	tags: string[];
	// };
};

const ReadSingleBlockComponent = (props: Props) => {
	let navigate = useNavigate();
	let blockId = "";
	let { id } = useParams();
	if (id) {
		blockId = id;
	}

	const [errorToastShown, setErrorToastShown] = useState(false);
	const [boughtToastShown, setBoughtToastShown] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	// const [ratingValue, setRatingValue] = useState<number>(3.87);
	const [currentUserRatingValue, setCurrentUserRatingValue] = useState<number>(
		0
	);

	let {
		LoadingSingleBlock,
		ErrorSingleBlock,
		SingleBlockData,
		refetch,
	} = useGetSingleBlock(blockId);

	let {
		buyBlock,
		errorBuyBlock,
		BuyBlockData,
		isErrorBuyBlock,
		isLoadingBuyBlock,
		isSuccessBuyBlock,
	} = useBuyBlock();

	let {
		postFavorite,
		errorPostFavorite,
		PostFavoriteData,
		isErrorPostFavorite,
		isLoadingPostFavorite,
		isSuccessPostFavorite,
	} = usePostFavorite();

	let {
		addRating,
		errorAddRating,
		AddRatingData,
		isErrorAddRating,
		isLoadingAddRating,
		isSuccessAddRating,
	} = useAddRating();

	useEffect(() => {
		if (errorBuyBlock && !errorToastShown) {
			const errorMessage = (errorBuyBlock as any)?.response?.data?.message;
			toast.error(errorMessage, {
				position: toast.POSITION.TOP_CENTER,
			});
			setErrorToastShown(true);
		}
	}, [errorBuyBlock, errorToastShown]);

	useEffect(() => {
		if (isSuccessBuyBlock) {
			if (!boughtToastShown) {
				toast.success("Block bought", {
					position: toast.POSITION.TOP_CENTER,
				});
				setBoughtToastShown(true);
			}
			refetch();
		}
	}, [isSuccessBuyBlock, refetch, boughtToastShown]);

	console.log(SingleBlockData);
	useEffect(() => {
		if (SingleBlockData) {
			setIsFavorite(SingleBlockData.isFavorite);
			if (SingleBlockData?.myRating?.rating) {
				setCurrentUserRatingValue(SingleBlockData.myRating.rating);
			}
		}
	}, [SingleBlockData]);


	const getTagDisplayName = (backendName: string) => {
		const displayTag = allTags.find((tag) => tag.backendName === backendName);
		return displayTag ? displayTag.display : "";
	};

	if (LoadingSingleBlock || isLoadingBuyBlock) {
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

	const handleRatingChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: number | null
	) => {
		if (value !== null) {
			setCurrentUserRatingValue(value);
			addRating({ id: blockId, rating: value });
		}
	};

	// console.log(isFavorite);
	// console.log(SingleBlockData.isFavorite);
	// const transformedTags = SingleBlockData.tags.map(transformTag);

	const toggleFavorite = () => {
		setIsFavorite((prev) => !prev);
		postFavorite(blockId);
	};

	let {
		fullBlock,
		_id,
		imageUrl,
		rating,
		price,
		text,
		views,
		title,
		tags,
		createdBy,
		tier,
	} = SingleBlockData;


	// let textElements = text.split("\n").map((para:string, index:number) => {
	// 	return <Typography key={index}>{para}</Typography>
	// })

	let textElements = text.replace(/\n/g, "<br>").split("<br>").map((para:string, index:number) => {
		if(para ==""){
			return <br />
		}
		return <Typography key={index}>{para}</Typography>
	})

	console.log(textElements)

	return (
		<BlockFraming hideSearch={false}>
			<Box sx={{ padding: 4 }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						alignItems: { xs: "center", sm: "flex-start" },
						gap: 2,
					}}
				>
					<Box sx={{ flexShrink: 0 }}>
						<img
							src={imageUrl}
							alt={title}
							style={{ width: "15em", height: "20em" }}
						/>
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="h5" sx={{ mb: 1 }}>
							{title}
						</Typography>
						<Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
							<Rating
								name="rating"
								value={rating}
								// onChange={handleRatingChange}
								precision={0.5}
							/>
							<Typography variant="body1" sx={{ ml: 1 }}>
								({rating.toFixed(2)})
							</Typography>
						</Box>
						<Typography variant="body1" sx={{ mb: 1 }}>
							Author:{" "}
							<Typography
								onClick={() => {
									navigate(`/profile/${createdBy._id}`);
								}}
								component="span"
								sx={{ textDecoration: "underline" }}
							>
								{createdBy.name}
							</Typography>
						</Typography>
						<Typography variant="body1" sx={{ mb: 1 }}>
							Tags:{" "}
							{tags.map((tag: string, index: number) => (
								<Box key={index} component={"span"}>
									<Link style={{ color: "#5A5A5A" }} to="#">
									{/* <Link style={{ color: "#5A5A5A" }} to={`/${tag}`}> */}
										{getTagDisplayName(tag)}
									</Link>
									{tags.indexOf(tag) !== tags.length - 1 && ", "}
								</Box>
							))}
						</Typography>
						{!fullBlock && (
							<Button
								variant="contained"
								sx={{ mr: 1 }}
								onClick={() => {
									setErrorToastShown(false);
									buyBlock(blockId);
								}}
							>
								<img
									src={gemImage}
									alt=""
									style={{
										width: "20px",
										height: "20px",
										marginRight: "5px",
										pointerEvents: "none", // Disable pointer events on this item
									}}
								/>
								{price}{" "}
							</Button>
						)}
						<Button variant="outlined" onClick={toggleFavorite}>
							{isFavorite ? (
								<FavoriteIcon sx={{ color: "orange" }} />
							) : (
								<FavoriteBorderIcon sx={{ color: "orange" }} />
							)}
						</Button>
					</Box>
				</Box>

				<Box sx={{ mt: 4 }}>
					<Typography variant="body2">{textElements}</Typography>



					{!fullBlock && (
						<Box
							sx={{
								mt: 4,
								backgroundColor: "#f8f8f8",
								padding: 2,
								borderRadius: 4,
							}}
						>
							<Typography
								variant="body2"
								color="text.secondary"
								textAlign="center"
							>
								Please buy this Block to access it in full
							</Typography>
						</Box>
					)}
				</Box>

				{fullBlock && (
					<Box
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							marginY: 5,
						}}
					>
						<Typography>What do you think?</Typography>
						<Box>
							<Rating
								name="rating"
								value={currentUserRatingValue}
								onChange={handleRatingChange}
								precision={0.5}
							/>
							<Typography>Rate this Block</Typography>{" "}
						</Box>
					</Box>
				)}
			</Box>
		</BlockFraming>
	);
};

export default ReadSingleBlockComponent;

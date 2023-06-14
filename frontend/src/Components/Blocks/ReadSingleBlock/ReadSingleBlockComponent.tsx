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

	useEffect(() => {
		if (SingleBlockData) {
			setIsFavorite(SingleBlockData.isFavorite);
		}
	}, [SingleBlockData]);

	const capitalizeFirstLetter = (str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const transformTag = (tag: string) => {
		if (tag === "youngadult") {
			return "Young Adult";
		} else if (tag === "historicalfiction") {
			return "Historical Fiction";
		} else if (tag === "sciencefiction") {
			return "Science Fiction";
		} else if (tag === "selfhelp") {
			return "Self Help";
		} else {
			return capitalizeFirstLetter(tag);
		}
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

	console.log(isFavorite);
	console.log(SingleBlockData.isFavorite);
	const transformedTags = SingleBlockData.tags.map(transformTag);

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
						<Typography variant="body1" sx={{ mb: 1 }}>
							Rating: {rating}
						</Typography>
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
							Tags:
							{transformedTags.map((tag: string, index: number) => (
								<Box key={index} component={"span"}>
									<Link style={{ color: "#5A5A5A" }} to={`/${tag}`}>
										{tag}
									</Link>
									{index !== transformedTags.length - 1 && ", "}
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
								Buy
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
					<Typography variant="body2">{text}</Typography>
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
			</Box>
		</BlockFraming>
	);
};

export default ReadSingleBlockComponent;

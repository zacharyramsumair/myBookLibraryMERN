import React from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import { Box, Button, Typography } from "@mui/material";

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
	let fullContent = false;

	return (
		<BlockFraming hideSearch={false}>
			<Box sx={{ padding: 4 }}>
				{/* Section 1: Book Details */}
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
							src="https://images.unsplash.com/photo-1618042164219-62c820f10723?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
							alt="title of book"
							style={{ width: "auto", height: "20em" }}
						/>

						{/* <img src={props.book.image} alt={props.book.title} style={{ width: "100%", height: "auto" }} /> */}
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="h5" sx={{ mb: 1 }}>
							{/* {props.book.title} */}
							title of book
						</Typography>
						<Typography variant="body1" sx={{ mb: 1 }}>
							{/* Rating: {props.book.rating} */}
							Rating: 3.0
						</Typography>
						<Typography variant="body1" sx={{ mb: 1 }}>
							Author: J.K. Rowling
							{/* Author: {props.book.author} */}
						</Typography>
						<Typography variant="body1" sx={{ mb: 1 }}>
							Tags: Romance,Drama,Action,Fiction
							{/* Tags: {props.book.tags.join(", ")} */}
						</Typography>
						<Button variant="contained" sx={{ mr: 1 }}>
							Buy
						</Button>
						<Button variant="outlined">Favorite</Button>
					</Box>
				</Box>

				{/* Section 2: Book Text */}
				<Box sx={{ mt: 4 }}>
					<Typography variant="body2">
						Mr. and Mrs. Dursley, of number four, Privet Drive, were proud
						to say that they were perfectly normal, thank you very much.
						They were the last people you’d expect to be involved in
						anything strange or mysterious, because they just didn’t hold
						with such nonsense. Mr. Dursley was the director of a firm
						called Grunnings, which made drills. He was a big, beefy man
						with hardly any neck, although he did have a very large
						mustache. Mrs. Dursley was thin and blonde and had nearly
						twice the usual amount of neck, which came in very useful as
						she spent so much of her time craning over garden fences,
						spying on the neighbors. The Dursleys had a small son called
						Dudley and in their opinion there was no finer boy anywhere.
						
                        
                        The Dursleys had everything they wanted, but they also had a
						secret, and their greatest fear was that somebody would
						discover it.
					</Typography>

					{/* Banner for incomplete content */}
					{!fullContent && (
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

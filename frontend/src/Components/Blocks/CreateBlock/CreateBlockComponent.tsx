import React, { ChangeEvent, useState } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlockFraming from "../BlockFraming/BlockFraming";
import allTags from "../allTags";

const CreateBlockComponent = () => {
	const [formData, setFormData] = useState({
		title: "",
		price: 0,
		tier: "free",
		content: "",
		tags: [] as string[],
		image:
			"https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-book-cover-template-vector-realistic-illustration-isolated-on-gray-background-empty-png-image_1893997.jpg",
	});

	const [modalOpen, setModalOpen] = useState(false);
	const [imageModalValue, setImageModalValue] = useState("");

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setImageModalValue("");
	};

	const isValidImageUrl = async (url: string): Promise<boolean> => {
		const img = new Image();

		const loadImage = (): Promise<boolean> =>
			new Promise((resolve) => {
				img.onload = () =>
					resolve(
						img.complete &&
							img.naturalWidth !== 0 &&
							img.naturalHeight !== 0
					);
				img.onerror = () => resolve(false);
				img.src = url;
			});

		return await loadImage();
	};

	const handleImageModalValueChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setImageModalValue(event.target.value);
	};

	const handleImageUpload = async () => {
		try {
			// const isValid = await imageUrlValidator(inputValue);
			console.log(imageModalValue);
			const isValid = await isValidImageUrl(imageModalValue);

			if (isValid) {
				setFormData((prevData) => ({
					...prevData,
					image: imageModalValue,
				}));

				handleModalClose();
			} else {
				console.log("Invalid image URL");
				toast.error("Invalid image URL", {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		} catch (error) {
			console.error("Error validating image URL", error);
		}
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleTagClick = (tag: string) => {
		const selectedTags: string[] = formData.tags;
		const tagIndex = selectedTags.indexOf(tag);

		if (tagIndex > -1) {
			// Tag already selected, remove it
			selectedTags.splice(tagIndex, 1);
		} else {
			// Tag not selected, add it
			if (selectedTags.length >= 4) {
				toast.error("You can select up to 4 tags.");
				return;
			}
			selectedTags.push(tag);
		}

		setFormData((prevData) => ({
			...prevData,
			tags: selectedTags,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validation logic
		if (formData.title.trim() === "") {
			toast.error("Please enter a title.");
			return;
		}

		if (formData.price > 0) {
			formData.tier = "paid";
		} else {
			formData.tier = "free";
		}

		if (formData.content.trim() === "") {
			toast.error("Please enter some content.");
			return;
		}

		// Form submission logic
		console.log(formData);
	};

	const tagElements = allTags.map((tag, index) => (
		<Button
			variant="contained"
			color={formData.tags.includes(tag) ? "secondary" : "primary"}
			onClick={() => handleTagClick(tag)}
			sx={{ margin: 0.5 }}
			key={index}
		>
			{tag}
		</Button>
	));
	return (
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<Typography variant="h6">Create Block</Typography>
				<form onSubmit={handleSubmit}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							textAlign: "center",
							paddingY: 3,
							width: "100%",
							height: "100%",
						}}
					>
						<Box>
							<img
								src={formData.image}
								alt=""
								style={{ width: "8em", height: "10em" }}
							/>
						</Box>

						<Button
							variant="contained"
							color="primary"
							sx={{ margin: 2 }}
							onClick={handleModalOpen}
						>
							Upload Picture
						</Button>
					</Box>

					<Box sx={{ position: "relative" }}>
						<TextField
							label="Title"
							variant="outlined"
							fullWidth
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							margin="normal"
							inputProps={{ maxLength: 75 }}
						/>
						<Typography
							variant="caption"
							align="right"
							sx={{ position: "absolute", bottom: 5, right: 5 }}
						>
							{formData.title.length}/{75}
						</Typography>
					</Box>
					<TextField
						label="Price"
						variant="outlined"
						fullWidth
						name="price"
						type="number"
						value={formData.price}
						onChange={handleInputChange}
						margin="normal"
					/>
					<TextField
						label="Content"
						variant="outlined"
						fullWidth
						multiline
						// rows={1}
						name="content"
						value={formData.content}
						onChange={handleInputChange}
						margin="normal"
					/>
					<Box
						sx={{
							marginTop: 2,
						}}
					>
						<Typography variant="subtitle1">Tags:</Typography>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								flexDirection: { xs: "column", sm: "row" },
							}}
						>
							{tagElements}
						</Box>
					</Box>
					<Box sx={{ marginTop: 2 }}>
						<Button variant="contained" color="success" type="submit">
							Create Block
						</Button>
					</Box>
				</form>
			</Box>
			<Modal open={modalOpen} onClose={handleModalClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "#fff",
						borderRadius: 2,
						padding: 5,
						boxShadow:
							"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
						minWidth: "250px",
					}}
				>
					<Typography variant="h6">Upload Picture</Typography>
					<Typography variant="subtitle2">
						Ensure your image is publicly accessible
					</Typography>
					<TextField
						label="Image URL"
						variant="outlined"
						fullWidth
						value={imageModalValue}
						onChange={handleImageModalValueChange}
						margin="normal"
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleImageUpload}
					>
						Upload
					</Button>
				</Box>
			</Modal>
		</BlockFraming>
	);
};

export default CreateBlockComponent;

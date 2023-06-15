import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlockFraming from "../BlockFraming/BlockFraming";
import allTags from "../allTags";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateBlock } from "../../../Hooks/Blocks/useUpdateBlock";
import { useGetSingleBlock } from "../../../Hooks/Blocks/useGetSingleBlock";
import { useGetBlockForUpdating } from "../../../Hooks/Blocks/useGetBlockForUpdating";
import { useDeleteBlock } from "../../../Hooks/Blocks/useDeleteBlock";
import { BlurCircular } from "@mui/icons-material";
import { UserContext } from "../../../Contexts/UserContext";

const EditBlockComponent = () => {
	let navigate = useNavigate();
	let blockId = "";
	let { id } = useParams();
	if (id) {
		blockId = id;
	}

	const { user, setUser } = React.useContext(UserContext);

	const [formData, setFormData] = useState({
		title: "",
		price: 0,
		tier: "free",
		text: "",
		tags: [] as string[],
		imageUrl:
			"https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-book-cover-template-vector-realistic-illustration-isolated-on-gray-background-empty-png-image_1893997.jpg",
	});

	// let navigate = useNavigate();

	const [modalOpen, setModalOpen] = useState(false);
	const [imageModalValue, setImageModalValue] = useState("");
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

	let {
		LoadingBlockForUpdating,
		ErrorBlockForUpdating,
		BlockForUpdatingData,
		refetch,
	} = useGetBlockForUpdating(blockId);

	let {
		updateBlock,
		errorUpdateBlock,
		UpdateBlockData,
		isErrorUpdateBlock,
		isLoadingUpdateBlock,
		isSuccessUpdateBlock,
	} = useUpdateBlock();

	let {
		deleteBlock,
		errorDeleteBlock,
		DeleteBlockData,
		isErrorDeleteBlock,
		isLoadingDeleteBlock,
		isSuccessDeleteBlock,
	} = useDeleteBlock();

	useEffect(() => {
		if (BlockForUpdatingData) {
			if (!user) {
				navigate(`/block/${blockId}`);
				toast.error("You do not have access to edit this block", {
					position: toast.POSITION.TOP_CENTER,
				});
			} else if (user.id != BlockForUpdatingData.createdBy._id) {
				navigate(`/block/${blockId}`);
				toast.error("You do not have access to edit this block", {
					position: toast.POSITION.TOP_CENTER,
				});
			} else {
				setFormData({
					title: BlockForUpdatingData.title,
					price: BlockForUpdatingData.price,
					tier: BlockForUpdatingData.tier,
					text: BlockForUpdatingData.text,
					tags: BlockForUpdatingData.tags,
					imageUrl: BlockForUpdatingData.imageUrl,
				});
			}
		}
	}, [BlockForUpdatingData]);

	//alert errors
	useEffect(() => {
		if (errorUpdateBlock) {
			console.log(errorUpdateBlock);
		}
		if (ErrorBlockForUpdating) {
			console.log(ErrorBlockForUpdating);
		}
	}, [errorUpdateBlock, ErrorBlockForUpdating]);

	useEffect(() => {
		if (isSuccessUpdateBlock) {
			navigate(`/block/${UpdateBlockData._id}`);
		}
	}, [isSuccessUpdateBlock]);

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
					imageUrl: imageModalValue,
					// imageUrl: imageModalValue,
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

		formData.price = Number(formData.price);

		// Validation logic
		if (formData.title.trim() === "") {
			toast.error("Please enter a title.");
			return;
		}

		if (formData.price < 0 || !Number.isInteger(formData.price)) {
			toast.error("Price must be an integer greater than or equal to 0");
			return;
		}

		if (formData.price > 0) {
			formData.tier = "paid";
			if (formData.text.length < 500) {
				toast.error("Paid Blocks must be a minimum of 500 characters long");
				return;
			}
		} else {
			formData.tier = "free";
		}

		if (formData.text.trim() === "") {
			toast.error("Please enter some content.");
			return;
		}

		// Form submission logic
		console.log(formData);
		updateBlock({ id: blockId, blockInfo: { ...formData } });
	};

	const handleDeleteClick = () => {
		setDeleteModalOpen(true);
	};

	const handleDeleteConfirm = () => {
		console.log("Block deleted");
		deleteBlock(blockId);
		setDeleteModalOpen(false);
		navigate("/myBlocks");
		// Redirect logic goes here
	};

	const handleDeleteCancel = () => {
		setDeleteModalOpen(false);
	};

	if (LoadingBlockForUpdating || isLoadingUpdateBlock) {
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

	const tagElements = allTags.slice(1).map((tag, index) => (
		<Button
			variant="contained"
			color={
				formData.tags.includes(tag.backendName) ? "secondary" : "primary"
			}
			onClick={() => handleTagClick(tag.backendName)}
			sx={{ margin: 0.5 }}
			key={index}
		>
			{tag.display}
		</Button>
	));

	return (
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="h6">Edit Block</Typography>
					<DeleteIcon
						sx={{ ml: 2, cursor: "pointer", color: "red" }}
						onClick={handleDeleteClick}
					/>
				</Box>
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
								src={formData.imageUrl}
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
						label="Text"
						variant="outlined"
						fullWidth
						multiline
						// rows={1}
						name="text"
						value={formData.text}
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
					<Box sx={{ marginTop: 5 }}>
						<Button
							variant="contained"
							color="error"
							type="button"
							onClick={() => navigate(-1)}
							sx={{ marginX: 1 }}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="success"
							type="submit"
							sx={{ marginX: 1 }}
						>
							Edit Block
						</Button>
					</Box>
				</form>
			</Box>
			<Modal open={isDeleteModalOpen} onClose={handleDeleteCancel}>
				<Box
					sx={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						maxWidth: "90%",
						width: 400,
						bgcolor: "background.paper",
						p: 2,
						outline: "none",
						borderRadius: "4px",
						boxShadow: 24,
					}}
				>
					<Typography variant="h6">Confirm Deletion</Typography>
					<Typography variant="body1">
						Are you sure you want to delete this block?
					</Typography>
					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
						<Button
							variant="contained"
							onClick={handleDeleteCancel}
							sx={{ mr: 2 }}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handleDeleteConfirm}
						>
							Delete
						</Button>
					</Box>
				</Box>
			</Modal>
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

export default EditBlockComponent;

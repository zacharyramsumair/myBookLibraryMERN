import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
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
	});

	const handleInputChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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


	// console.log(typeof allTags[0])
	const tagElements = allTags.map((tag, index) => (
		<Button
			variant="contained"
			color={formData.tags.includes(tag) ? "secondary" : "primary"}
			onClick={() => handleTagClick(tag)}
			sx={{ marginRight: 1, marginBottom: 1 }}
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
					<TextField
						label="Title"
						variant="outlined"
						fullWidth
						name="title"
						value={formData.title}
						onChange={handleInputChange }
						margin="normal"
					/>
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
					<Box sx={{ marginTop: 2 }}>
						<Typography variant="subtitle1">Tags:</Typography>
						{tagElements}
					</Box>
					<Box sx={{ marginTop: 2 }}>
						<Button variant="contained" color="success" type="submit">
							Create Block
						</Button>
					</Box>
				</form>
			</Box>
		</BlockFraming>
	);
};

export default CreateBlockComponent;

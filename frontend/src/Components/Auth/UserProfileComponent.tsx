import React from "react";
import BlockFraming from "../Blocks/BlockFraming/BlockFraming";
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	Avatar,
	Grid,
	Link,
	CircularProgress,
} from "@mui/material";
import ImageCarousel from "../Blocks/ImageCarousel/ImageCarousel";
import { Favorite } from "@mui/icons-material";
import { useGetProfile } from "../../Hooks/Auth/useGetProfile";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import allTags from "../Blocks/allTags";

type Props = {};

const UserProfileComponent = (props: Props) => {
	let blockId = "";
	let { id } = useParams();
	if (id) {
		blockId = id;
	}

	let { LoadingProfile, ErrorProfile, ProfileData, refetch } = useGetProfile(
		blockId
	);

	useEffect(() => {
		if (ProfileData) {
			console.log(ProfileData);
		}
	}, [ProfileData]);

	function calculateAge(birthday: string): number {
		const birthDate = new Date(birthday);
		const today = new Date();

		let age = today.getFullYear() - birthDate.getFullYear();

		// Check if the birthday hasn't occurred yet this year
		if (
			today.getMonth() < birthDate.getMonth() ||
			(today.getMonth() === birthDate.getMonth() &&
				today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	}

	const getTagDisplayName = (backendName: string) => {
		const displayTag = allTags.find((tag) => tag.backendName === backendName);
		return displayTag ? displayTag.display : "";
	};

	if (LoadingProfile) {
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

	let doesNameEndWithS =
		ProfileData.personalInfo.name.endsWith("s") ||
		ProfileData.personalInfo.name.endsWith("S");
	let possessiveName = `${ProfileData.personalInfo.name}'${
		doesNameEndWithS ? "" : "s"
	}`;

	return (
		<BlockFraming hideSearch={true}>
			<Box sx={{ padding: 4 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
							textAlign="center"
							paddingBottom={3}
							sx={{ width: "100%", height: "100%" }}
						>
							<Avatar
								alt={`Profile pic of ${ProfileData.personalInfo.name}`}
								// src="https://example.com/profile-picture.jpg" // Replace with the actual image URL or use a placeholder
								src={ProfileData.personalInfo.profilePic}
								sx={{ width: 150, height: 150 }}
							/>
							{/* <Typography variant="h6" gutterBottom>
              Followers: 1000 
            </Typography>
            <Button variant="contained" color="primary">
              Follow
            </Button> */}
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box>
							<Typography variant="h6" gutterBottom>
								Name: {ProfileData.personalInfo.name}{" "}
								{/* Replace with the actual name */}
							</Typography>
							<Typography variant="subtitle1" gutterBottom>
								Age: {calculateAge(ProfileData.personalInfo.birthday)}{" "}
								{/* Age: {ProfileData.personalInfo.birthday}{" "} */}
								{/* Replace with the actual age */}
							</Typography>

							<Typography variant="subtitle1" gutterBottom>
								Location: {ProfileData.personalInfo.location}{" "}
								{/* Replace with the actual location */}
							</Typography>
							<Typography variant="subtitle1" gutterBottom>
								About Me: {ProfileData.personalInfo.aboutMe}
								{/* Replace with the actual about me */}
							</Typography>

							{ProfileData.personalInfo.favoriteTags && (
								<Typography variant="subtitle1" gutterBottom>
									{/* Favorite Genres: Romance + Fantasy{" "} */}
									Favorite Genres:{" "}
									{ProfileData.personalInfo.favoriteTags.map(
										(tag: string) => {
											console.log(tag);
											return (
												<Box component={"span"}>
													{getTagDisplayName(tag)}
													{ProfileData.personalInfo.favoriteTags.indexOf(
														tag
													) !==
														ProfileData.personalInfo.favoriteTags
															.length -
															1 && " + "}
												</Box>
											);
										}
									)}
								</Typography>
							)}

							{/* <Typography variant="subtitle1" gutterBottom>
								Website:{" "}
								<Link
									sx={{
										textDecoration: "none",
										color: "blue",
										cursor: "pointer",
										wordBreak: "break-all",
										wordWrap: "break-word",
										whiteSpace: "pre-wrap",
									}}
									href={ProfileData.personalInfo.website}
									target="_blank"
									rel="noopener noreferrer"
								>
									{ProfileData.personalInfo.website}
								</Link>{" "}
								{/* Replace with the real website */}
							{/* </Typography> */}

							<Typography variant="subtitle1" gutterBottom>
								Website:{" "}
								<Typography
									variant="subtitle1"
									component={"span"}
									sx={{
										textDecoration: "none",
										color: "blue",
										cursor: "pointer",
										wordBreak: "break-all",
										wordWrap: "break-word",
										whiteSpace: "pre-wrap",
									}}
									onClick={() => {
										window.open(
											ProfileData.personalInfo.website.startsWith(
												"https://"
											)
												? `${ProfileData.personalInfo.website}`
												: `https://${ProfileData.personalInfo.website}`,
											"_blank"
										);
									}}
								>
									{ProfileData.personalInfo.website}
								</Typography>
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Box>
					{/* <ImageCarousel  fullRow={true} headerText={` Blocks`} align="left" listOfImages={ProfileData.createdBlocks} /> */}
					<ImageCarousel
						fullRow={true}
						headerText={`${possessiveName} Blocks`}
						align="left"
						listOfImages={ProfileData.createdBlocks}
					/>
					{ProfileData.favoriteBlocks && (
						<ImageCarousel
							fullRow={true}
							headerText={`${possessiveName} Favorites`}
							align="left"
							listOfImages={ProfileData.favoriteBlocks}
						/>
					)}
				</Box>
			</Box>
		</BlockFraming>
	);
};

export default UserProfileComponent;

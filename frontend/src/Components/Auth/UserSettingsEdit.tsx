import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Modal,
} from "@mui/material";
import { toast } from "react-toastify";





interface ProfileData {
  name: string;
  birthday: string;
  location: string;
  aboutMe: string;
  website: string;
  profilePic: string;
}

const UserSettingsEdit = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "User's Name",
    birthday: new Date().toISOString().split("T")[0],
    location: "Somewhere on the Earth",
    aboutMe: "I really enjoy reading",
    website: "ihavenowebsite.com",
    profilePic:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMOEhIOEBMQDg8QDQ0PDg4ODQ8PEA8NFREWFhUSFhUYHCggGCYlGxMTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKDQ0NDw0NDysZFRktLS0rKystLSsrKysrNy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIFBgQDB//EADMQAQACAAMGBAYCAwcFAQAAAAAAAQIDBBEhBQYSITEDEyIyUXEjkaHB0RQywfHBFhYmM0JUgfD/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDB//EADMQAQEAAgECAwQHCAMAAAAAAAAAAAECAwQREiExBhMiUWFxEyKRof/AABEIAOEAwEBAAAAAAAAAAAAAAAAAQIRAyExUf/aAAwDAQACEQMRAD8AknNRRRRRRXwu8Zt8/wAOTit5vrBZQH/AI6lFFVZvrGGhZ2OJJt/KcuVbj6jnnr//9k=",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleProfileChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(profileData);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setInputValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isValidImageUrl = async (url: string): Promise<boolean> => {
		const img = new Image();
	  
		const loadImage = (): Promise<boolean> =>
		  new Promise((resolve) => {
			img.onload = () => resolve(img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0);
			img.onerror = () => resolve(false);
			img.src = url;
		  });
	  
		return await loadImage();
	  };

  const handleImageUpload = async () => {
    try {
      // const isValid = await imageUrlValidator(inputValue);

      const isValid = await isValidImageUrl(inputValue)

     


      if (isValid) {
        setProfileData((prevData) => ({
          ...prevData,
          profilePic: inputValue,
        }));


        handleModalClose()
      } else {
        console.log("Invalid image URL");
        toast.error('Invalid image URL', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error validating image URL", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 5,
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          margin: 3,
          minHeight: 200,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                paddingBottom: 3,
                width: "100%",
                height: "100%",
              }}
            >
              <Avatar
                alt="Profile Picture"
                src={profileData.profilePic}
                sx={{ width: 150, height: 150 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ margin: 2 }}
                onClick={handleModalOpen}
              >
                Upload Picture
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box>
                <Typography variant="h5">Edit Profile</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  margin="normal"
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  label="Birthday"
                  variant="outlined"
                  fullWidth
                  name="birthday"
                  type="date"
                  value={profileData.birthday}
                  onChange={handleProfileChange}
                  margin="normal"
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                  margin="normal"
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  label="About Me"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  name="aboutMe"
                  value={profileData.aboutMe}
                  onChange={handleProfileChange}
                  margin="normal"
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  label="Website"
                  variant="outlined"
                  fullWidth
                  name="website"
                  value={profileData.website}
                  onChange={handleProfileChange}
                  margin="normal"
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
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
          }}
        >
          <Typography variant="h6">Upload Picture</Typography>
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
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
    </Container>
  );
};

export default UserSettingsEdit;

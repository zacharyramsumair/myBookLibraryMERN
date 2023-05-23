import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Link,
} from "@mui/material";

type Props = {};

const UserSettingsRead = (props: Props) => {
  return (
    <Container
      maxWidth="lg"
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
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            paddingBottom={3}
            sx={{ width: "100%", height: "100%" }}
          >
            <Avatar
              alt="Profile Picture"
              src="https://example.com/profile-picture.jpg" // Replace with the actual image URL or use a placeholder
              sx={{ width: 150, height: 150 }}
            />
            <Typography variant="h6" gutterBottom>
              Followers: 1000 {/* Replace with the actual number of followers */}
            </Typography>
            <Button variant="contained" color="primary">
              Follow
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Name: John Doe {/* Replace with the actual name */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Age: 25 {/* Replace with the actual age */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Gender: Male {/* Replace with the actual gender */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Location: New York {/* Replace with the actual location */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              About Me: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis nostrum aliquam adipisci alias mollitia voluptas quas ipsam eos tempore eaque, esse doloremque reprehenderit rerum iure!
              {/* Replace with the actual about me */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Joined: January 1, 1990 {/* Replace with the actual date */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Last Active: March 23, 2023 {/* Replace with the actual date */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Favourite Genres: Romance + Fantasy {/* Replace with the real genres */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
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
                href="https://www.youtube.com/@TrashTaste"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.youtube.com/@TrashTaste
              </Link>{" "}
              {/* Replace with the real website */}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserSettingsRead

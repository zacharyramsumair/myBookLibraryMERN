import React from "react";
import { Box, Typography, Link, Grid, TextField, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "2em 3em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Grid
        container
        spacing={2}
        // justifyContent= "center"
        // justifyContent={{ xs: "center", sm: "flex-start", md: "space-around" }}
        // alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        <Grid item xs={5} sm={6} md={3} sx={{pt:0}}>
          <Typography variant="body2" sx={{pt:0}}>
            <Link href="/">Logo</Link>
          </Typography>
        </Grid>

        <Grid item xs={3.5} sm={3} md={2}>
          <Link href="/try-now">Try Now</Link>
        </Grid>

        <Grid item xs={3.5} sm={3} md={2}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Link href="/register">Register</Link>
            </Grid>
            <Grid item>
              <Link href="/login">Login</Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={5} sx={{width:{xs:'100vw', md:"auto"}, marginX:{xs:"5%",sm:"25%", md:"0"}}}>
          <Typography variant="body2">Subscribe to our newsletter:</Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item sx={{my:2}}>
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </Grid>

        
      </Grid>
    </Box>
  );
};

export default Footer;

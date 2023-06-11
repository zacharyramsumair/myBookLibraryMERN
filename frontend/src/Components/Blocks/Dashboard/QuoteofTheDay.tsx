import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

type Props = {};

const QuoteofTheDay = (props: Props) => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  
  return (
    <Box
      sx={{
        backgroundColor: "orange",
        backgroundImage: "linear-gradient(300deg, #792A8E, #BD4246)",
        borderRadius: 3,
        padding: "1rem",
        width: isMdScreen ? "35%" : "80%",
        minHeight:"10em",
        textAlign: "left",
        // textAlign: isMdScreen ? "left" : "center",
        margin: {xs:"1rem 0", md:"0"},
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
        Quote of the day
      </Typography>
      <Typography variant="body1" sx={{ color: "white" }}>
        "Your quote goes here"
      </Typography>
    </Box>
  );
};

export default QuoteofTheDay;

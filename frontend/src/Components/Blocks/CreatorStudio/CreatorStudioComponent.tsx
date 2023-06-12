import React from "react";
import BlockFraming from "../BlockFraming/BlockFraming";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {};

const DashboardComponent = (props: Props) => {
    let navigate = useNavigate()
  return (
    <BlockFraming hideSearch={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            backgroundImage: "linear-gradient(to right, #FFC0CB, #FF1493)",
            padding: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
            width: "100%",
            maxWidth: "800px",
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            color: "white",
            cursor:"pointer"

          }}

          onClick={() =>navigate("/myBlocks") }
        >
          <Typography variant="h4">View my Blocks</Typography>
        </Box>
        <Box
          sx={{
            backgroundImage: "linear-gradient(to right, #87CEEB, #1E90FF)",
            padding: "2rem",
            textAlign: "center",
            width: "100%",
            maxWidth: "800px",
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            color: "white",
            cursor:"pointer"
          }}

          onClick={() =>navigate("/create") }

        >
          <Typography variant="h4">Create a New Block</Typography>
        </Box>
      </Box>
    </BlockFraming>
  );
};

export default DashboardComponent;

import { Box, Container, Typography, Grid } from "@mui/material";
import React from "react";
import FAQItem from "./FAQItem";

type Props = {};

const FAQ = (props: Props) => (
  <Box sx={{ py: 10, overflow: "hidden" }}>
    <Container maxWidth="lg" sx={{ overflow: "hidden" }}>
      <Typography variant="h3" component="h2" sx={{py:2}}>
        Frequently Asked Questions
      </Typography>

      <Typography variant="body1" component="p">
        If you have any further questions, please contact us.
      </Typography>

      <Box sx={{ py: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}  md={6} lg={6}>
            <FAQItem question="this is question one" answer="this is answer to question one" />
          </Grid>
          <Grid item xs={12}  md={6} lg={6} style={{ gridRow: "span 2" }}>
            <FAQItem question="this is question two" answer="this is answer to question two" />
          </Grid>
          <Grid item xs={12}  md={6} lg={6}>
            <FAQItem question="this is question three" answer="this is answer to question three" />
          </Grid>
          <Grid item xs={12}  md={6} lg={6}>
            <FAQItem question="this is question four" answer="this is answer to question four" />
          </Grid>
          <Grid item xs={12}  md={6} lg={6}>
            <FAQItem question="this is question five" answer="this is answer to question five" />
          </Grid>
          <Grid item xs={12}  md={6} lg={6}>
            <FAQItem question="this is question six" answer="this is answer to question six" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default FAQ;

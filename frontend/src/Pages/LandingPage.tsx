import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import LandingPageCallToAction from '../Components/LandingPageCallToAction';
import FAQ from '../Components/FAQ';
import Footer from '../Components/FooterLandingPage';
import Navbar from '../Components/NavbarLandingPage';

const LandingPage = () => {
  //smaller than medium breakpoint ( including small)
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    //larger than medium breakpoint (not including medium)
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));


  console.log(isSmallScreen)
  return (
    <>
    <Navbar/>
    <Box sx={{
        outline: "red dashed 1px",
        overflowX: "hidden",
      }}>

    <LandingPageCallToAction/>
    <FAQ/>
    </Box>
    <Footer/>
    </>
  );
};

export default LandingPage;

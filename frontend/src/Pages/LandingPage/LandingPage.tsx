import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import LandingPageCallToAction from '../../Components/LandingPage/LandingPageCallToAction';
import FAQ from '../../Components/LandingPage/FAQ';
import Navbar from '../../Components/LandingPage/NavbarLandingPage';
import Footer from '../../Components/LandingPage/FooterLandingPage';

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

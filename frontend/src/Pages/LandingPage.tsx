import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

const LandingPage = () => {
  //smaller than medium breakpoint ( including small)
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    //larger than medium breakpoint (not including medium)
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));


  console.log(isSmallScreen)
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        paddingTop: { sm: '56px', md: '64px' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100vw', md: '70vw' },
          height: { xs: '70vh', md: '100vh' },
          backgroundColor: { xs: 'red', sm: 'green', md: 'yellow', lg: 'pink', xl: 'orange' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: { xs: '1em', sm:'5em' }, // Adding padding bottom for sm screen
          position: 'relative', // Add position relative to enable absolute positioning of the cat image
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, color: '#fff', marginX: { xs: '5%', md: '10%', lg: '15%' } }}>
          <Typography variant={isSmallScreen ? 'h2' : 'h1'} component="h1" sx={{ mb: 2 }}>
            Live your adventure
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Read any book you want right now, like seriously
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
            }}
          >
            <Button variant="contained" sx={{ mr: 2 }}>
              Hey there
            </Button>
            <Button variant="contained" color="secondary">
              Buy ME
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: '100vw',  md: '30%' },
          height: { xs: '30vh', md: '100vh' },
          backgroundColor: '#333',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', left: {xs:'auto',md:'-10em'}, top: {xs:'-7.5em',md:'10em'}, display: { xs: 'block', md: 'block' } }}>
          <img className="landingImage" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Pan_Blue_Circle.png" alt="" />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;

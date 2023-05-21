import React from 'react'
import { Box } from '@mui/material';
import backgroundImage from "../assets/background.svg";

type Props = {}

const BasePageDesign = (props: Props) => {
  return (
<Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        {/* Component goes here */}
    </Box>  )
}

export default BasePageDesign
import React from 'react'
import { Box } from '@mui/material';
import backgroundImage from "../assets/background.svg";
import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

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
        {props.children}
    </Box>  )
}

export default BasePageDesign
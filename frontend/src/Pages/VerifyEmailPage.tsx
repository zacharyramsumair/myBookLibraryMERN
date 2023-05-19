import React from 'react'
import { Box } from '@mui/material';
import backgroundImage from "../assets/background.svg";
import VerifyEmail from '../Components/VerifyEmail';

type Props = {}

const VerifyEmailPage = (props: Props) => {
  return (
<Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <VerifyEmail/>
    </Box>  )
}

export default VerifyEmailPage
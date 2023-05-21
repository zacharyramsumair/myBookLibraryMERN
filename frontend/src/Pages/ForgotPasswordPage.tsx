import React from 'react'
import { Box } from '@mui/material';
import backgroundImage from "../assets/background.svg";
import ForgotPasswordForm from '../Components/ForgotPasswordForm';

type Props = {}

const ForgotPasswordPage = (props: Props) => {
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
      <ForgotPasswordForm/>
    </Box>  )
}

export default ForgotPasswordPage
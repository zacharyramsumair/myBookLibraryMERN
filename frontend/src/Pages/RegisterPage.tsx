import React from 'react'
import { Box } from '@mui/material';
import backgroundImage from "../assets/background.svg";
import RegisterForm from '../Components/RegisterForm';


type Props = {}

const RegisterPage = (props: Props) => {
  return (
    // <div>RegisterPage</div>
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
      <RegisterForm/>
    </Box>
  )
}

export default RegisterPage
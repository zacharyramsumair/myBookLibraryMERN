import React from 'react';
import LoginForm from '../Components/LoginForm';
import { Box } from '@mui/material';
import backgroundImage from "../assets/background.svg";

type Props = {};

const LoginPage: React.FC<Props> = (props) => {
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
      <LoginForm />
    </Box>
  );
};

export default LoginPage;

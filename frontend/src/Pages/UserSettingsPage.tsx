import { Box, Button } from '@mui/material';
import backgroundImage from "../assets/background.svg";
import UserSettingsRead from '../Components/UserSettingsRead';
import { UserContext } from './../Contexts/UserContext';
import { useContext } from 'react';
useContext

type Props = {}

const UserSettingsPage = (props: Props) => {
  let {user} = useContext(UserContext)
  console.log(user)

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
      <UserSettingsRead/>
      
    </Box>  )

}

export default UserSettingsPage
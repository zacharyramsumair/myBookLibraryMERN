
import UserSettingsRead from '../../Components/Auth/UserSettingsRead';
import { UserContext } from '../../Contexts/UserContext';
import { useContext } from 'react';
import BasePageDesign from '../BasePageDesign';
useContext

type Props = {}

const UserSettingsPage = (props: Props) => {
  let {user} = useContext(UserContext)
  console.log(user)

  return (
    <BasePageDesign>
    <UserSettingsRead/>
</BasePageDesign> )

}

export default UserSettingsPage
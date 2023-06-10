
import UserSettingsRead from '../../Components/Auth/UserSettingsRead';
import { UserContext } from '../../Contexts/UserContext';
import { useContext } from 'react';
import BasePageDesign from '../BasePageDesign';
import UserSettingsEdit from '../../Components/Auth/UserSettingsEdit';
useContext

type Props = {}

const UserSettingsPage = (props: Props) => {
  let {user} = useContext(UserContext)
  console.log(user)

  return (
    <BasePageDesign>
    <UserSettingsEdit/>
</BasePageDesign> )

}

export default UserSettingsPage
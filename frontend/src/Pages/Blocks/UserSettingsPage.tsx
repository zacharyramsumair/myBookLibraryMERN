import UserSettingsRead from "../../Components/Auth/UserSettingsRead";
import { UserContext } from "../../Contexts/UserContext";

import UserSettingsEdit from "../../Components/Auth/UserSettingsEdit";
import BasePageDesign from "../BasePageDesign";

import { useContext, useEffect } from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {};

const UserSettingsPage = (props: Props) => {
	let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("");
	}, []);

	let { user } = useContext(UserContext);
	// console.log(user);

	return (
		<BasePageDesign>
			<UserSettingsEdit />
		</BasePageDesign>
	);
};

export default UserSettingsPage;

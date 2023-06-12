import { UserContext } from "../../Contexts/UserContext";

import BasePageDesign from "../BasePageDesign";

import { useContext, useEffect } from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";
import UserProfileComponent from "../../Components/Auth/UserProfileComponent";

type Props = {};

const UserProfile = (props: Props) => {
	let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("");
	}, []);

	let { user } = useContext(UserContext);
	console.log(user);

	return (
		<BasePageDesign>
			<UserProfileComponent />
		</BasePageDesign>
	);
};

export default UserProfile;

import BasePageDesign from "../BasePageDesign";
import { useContext, useEffect } from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";
import StoreComponent from "../../Components/Store/StoreComponent/StoreComponent";

type Props = {};

const Store = (props: Props) => {
	let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("shelf");
	}, []);

	return (
		<BasePageDesign>
			<StoreComponent />
		</BasePageDesign>
	);
};

export default Store;

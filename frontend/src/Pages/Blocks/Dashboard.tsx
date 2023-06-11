import DashboardComponent from "../../Components/Blocks/Dashboard/DashboardComponent";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";
import BasePageDesign from "../BasePageDesign";
import { useContext , useEffect} from "react";

type Props = {};

const Dashboard = (props: Props) => {
	let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("home");
	}, []);

	return (
		<BasePageDesign>
			<DashboardComponent />
		</BasePageDesign>
	);
};

export default Dashboard;

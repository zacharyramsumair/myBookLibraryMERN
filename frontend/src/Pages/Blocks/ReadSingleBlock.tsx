import DashboardComponent from '../../Components/Blocks/Dashboard/DashboardComponent';
import ReadSingleBlockComponent from '../../Components/Blocks/ReadSingleBlock/ReadSingleBlockComponent';
import BasePageDesign from '../BasePageDesign';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {}

const ReadSingleBlock = (props: Props) => {
  let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("");
	}, []);
  return (
    <BasePageDesign>
    <ReadSingleBlockComponent/>
    </BasePageDesign>
)
}

export default ReadSingleBlock
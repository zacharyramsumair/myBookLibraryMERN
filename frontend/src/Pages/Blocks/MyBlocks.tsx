import BasePageDesign from '../BasePageDesign';
import MyBlocksComponent from '../../Components/Blocks/MyBlocks/MyBlocksComponent';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {}

const MyBlocks = (props: Props) => {
  let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("");
	}, []);
  return (
    <BasePageDesign>
    <MyBlocksComponent/>
    </BasePageDesign>
)
}

export default MyBlocks
import MyShelfComponent from '../../Components/Blocks/MyShelf/MyShelfComponent';
import BasePageDesign from '../BasePageDesign';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {}

const MyShelf = (props: Props) => {
  let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("shelf");
	}, []);
  return (
    <BasePageDesign>
    <MyShelfComponent/>
    </BasePageDesign>
)
}

export default MyShelf
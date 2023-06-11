import EditBlockComponent from '../../Components/Blocks/EditBlock/EditBlockComponent';
import BasePageDesign from '../BasePageDesign';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {}

const EditBlock = (props: Props) => {
  let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("");
	}, []);
  return (
    <BasePageDesign>
    <EditBlockComponent/>
    </BasePageDesign>
)
}

export default EditBlock
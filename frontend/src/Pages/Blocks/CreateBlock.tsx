import CreateBlockComponent from '../../Components/Blocks/CreateBlock/CreateBlockComponent';
import BasePageDesign from '../BasePageDesign';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";



type Props = {}

const CreateBlock = (props: Props) => {
	let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("");
	}, []);

  return (
    <BasePageDesign>
    <CreateBlockComponent/>
    </BasePageDesign>
)
}

export default CreateBlock
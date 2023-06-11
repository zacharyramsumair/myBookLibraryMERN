import CreatorStudioComponent from '../../Components/Blocks/CreatorStudio/CreatorStudioComponent';
import BasePageDesign from '../BasePageDesign';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {}

const CreatorStudio = (props: Props) => {
  let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("");
	}, []);
  return (
    <BasePageDesign>
    <CreatorStudioComponent/>
    </BasePageDesign>
)
}

export default CreatorStudio
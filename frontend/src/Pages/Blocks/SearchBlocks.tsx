import SearchBlocksComponent from '../../Components/Blocks/SearchBlocks/SearchBlocksComponent';
import BasePageDesign from '../BasePageDesign';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {}

const SearchBlocks = (props: Props) => {
  let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("search");
	}, []);
  return (
    <BasePageDesign>
    <SearchBlocksComponent/>
    </BasePageDesign>
)
}

export default SearchBlocks
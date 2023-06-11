import MyFavoritesComponent from '../../Components/Blocks/MyFavorites/MyFavoritesComponent';
import BasePageDesign from '../BasePageDesign';
import { useContext , useEffect} from "react";
import { ActiveNavbarContext } from "../../Contexts/activeNavbarContext";

type Props = {}

const MyFavorites = (props: Props) => {
  let { setActiveNavSection } = useContext(ActiveNavbarContext);

	useEffect(() => {
		setActiveNavSection("favorites");
	}, []);
  return (
    <BasePageDesign>
    <MyFavoritesComponent/>
    </BasePageDesign>
)
}

export default MyFavorites
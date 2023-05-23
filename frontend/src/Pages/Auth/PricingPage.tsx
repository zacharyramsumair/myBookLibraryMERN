
import PricingComponent from '../../Components/PriceCards/PricingComponent';
import Navbar from '../../Components/LandingPage/NavbarLandingPage';
import BasePageDesign from '../BasePageDesign';

type Props = {}

const PricingPage = (props: Props) => {
  return (<>
  <Navbar/>
  <BasePageDesign>
      <PricingComponent />
 </BasePageDesign>
  </>
    
    )
}

export default PricingPage
import DashboardComponent from '../../Components/Blocks/Dashboard/DashboardComponent';
import ReadSingleBlockComponent from '../../Components/Blocks/ReadSingleBlock/ReadSingleBlockComponent';
import BasePageDesign from '../BasePageDesign';

type Props = {}

const ReadSingleBlock = (props: Props) => {
  return (
    <BasePageDesign>
    <ReadSingleBlockComponent/>
    </BasePageDesign>
)
}

export default ReadSingleBlock
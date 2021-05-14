import Icon from './Icon'
import { HiArrowCircleRight } from "react-icons/hi";
import { BiBullseye } from "react-icons/bi";

function InfoBar() {
    const startArrow = <HiArrowCircleRight size={30}/>
    const bullsEye = <BiBullseye size={25}/>
    return (
        <div className="opt-row">
            <Icon icon="start" iconValue={startArrow} text="Start Node"></Icon>
            <Icon icon="end" iconValue={bullsEye} text="End Node"></Icon>
            <Icon icon="node-searched" iconValue="" text="Searched Node"></Icon>
            <Icon icon="node-visited" iconValue="" text="Shortest Path"></Icon>
        </div>
    )
}

export default InfoBar

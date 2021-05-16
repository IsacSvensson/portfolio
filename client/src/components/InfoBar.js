import Icon from './Icon'
import { HiArrowCircleRight } from "react-icons/hi";
import { BiBullseye } from "react-icons/bi";
/* import { FaWeightHanging } from "react-icons/fa" */

function InfoBar() {
    const startArrow = <HiArrowCircleRight size={20}/>
    const bullsEye = <BiBullseye size={20}/>
    /* const weight = <FaWeightHanging size={20}/> */
    return (
        <div className="opt-row">
            <Icon icon="start" iconValue={startArrow} text="Start Node"></Icon>
            <Icon icon="end" iconValue={bullsEye} text="End Node"></Icon>
            <Icon icon="node" iconValue="" text="Unvisited Node"></Icon>
            <Icon icon="wall" iconValue="" text="Wall Node"></Icon>
            <Icon icon="node-searched" iconValue="" text="Visited Node"></Icon>
            {/* <Icon icon="start" iconValue={weight} text="Weigtht"></Icon> */}
            <Icon icon="node-visited" iconValue="" text="Shortest Path"></Icon>
        </div>
    )
}

export default InfoBar

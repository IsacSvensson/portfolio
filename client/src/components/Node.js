import PropTypes from 'prop-types'
import { HiArrowCircleRight } from "react-icons/hi";
import { BiBullseye } from "react-icons/bi";

function Node({node, mouseDown, mouseUp, mouseEnter}) {
    let classVar = "node"
    let val = "";

    if (node.isStart){
        classVar += " start"
        val = <HiArrowCircleRight size={20}/>
    } else if (node.isEnd){
        classVar += " end"
        val = <BiBullseye size={20}/>
    } else if (node.isWall){
        classVar += " wall"
    }

    return (
        <div 
            id={"node" + node.id}
            className={classVar}
            onMouseDown={() => mouseDown(node)}
            onMouseUp={() => mouseUp(node)}
            onMouseEnter={() => mouseEnter(node)}
        > {val}
        </div>
    )
}

Node.defaultPropTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
}

export default Node

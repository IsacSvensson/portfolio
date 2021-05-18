import PropTypes from 'prop-types'
import { HiArrowCircleRight } from "react-icons/hi";
import { BiBullseye } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa"

function Node({node, mouseDown, mouseUp, mouseEnter, setContextMenu}) {
    let classVar = "node"
    let val = "";

    const handleContextMenu = (e) => {
        e.preventDefault()
        const x = (e.clientX) + 'px'
        const y = (e.clientY) + 'px'
        setContextMenu({
            x:x,
            y:y,
            showMenu: true,
            node:node,
        })
    }

    if (node.isStart){
        classVar += " start"
        val = <HiArrowCircleRight size={20}/>
    } else if (node.isEnd){
        classVar += " end"
        val = <BiBullseye size={20}/>
    } else if (node.isWeight){
        classVar += " weight"
        val = <FaWeightHanging size={20}/> 
    } else if (node.isWall){
        classVar += " wall"
    }

    return (
        <div 
            id={"node" + node.id}
            className={classVar}
            onContextMenu={handleContextMenu}
            onMouseDown={(e) => {
                const x = (e.screenX - 50) + 'px'
                const y = (e.screenY - 50) + 'px'
                mouseDown(node) 
                setContextMenu({
                x:x,
                y:y,
                showMenu: false,
                node:node,
            })}}
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

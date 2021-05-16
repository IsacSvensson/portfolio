import PropTypes from 'prop-types'
import Node from './Node'

function Row({row, mouseDown, mouseUp, mouseEnter, setContextMenu}) {
    let nodes = row.map((node, idx) => 
        <Node 
            node={node}
            key={"node" + idx}
            mouseDown={mouseDown}
            mouseUp={mouseUp}
            mouseEnter={mouseEnter}
            setContextMenu={setContextMenu}
        />)   

    return (
        <div className="row">
            {nodes}
        </div>
    )
}

Row.defaultPropTypes = {
    row: PropTypes.number.isRequired,
}


export default Row

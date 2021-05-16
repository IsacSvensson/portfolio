import { useState } from 'react';
import Row from "./Row";
import ContextMenu from './ContextMenu'


function Container({grid, mouseDown, mouseUp, mouseEnter, setAttribute}) {
    const [contextMenuState, setContextMenu] = useState({
        x:0, 
        y:0,
        showMenu: false,
        node: null
    })

    let rows = grid.map((row, idx) => 
        <Row 
            row={row}
            key={"row" + idx}
            mouseUp={mouseUp}
            mouseDown={mouseDown}
            mouseEnter={mouseEnter}
            setContextMenu={setContextMenu}
        />)   

    return (
        <div className="container" onMouseUp={mouseUp}>
            <ContextMenu menuState={contextMenuState} setAttribute={setAttribute} setContextMenu={setContextMenu}/>
            {rows}
        </div>
    )
}

export default Container

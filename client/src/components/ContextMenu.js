import { HiArrowCircleRight } from "react-icons/hi";
import { BiBullseye } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa"

function ContextMenu({menuState, setContextMenu, setAttribute}) {
    const style = {
        top:menuState.y,
        left:menuState.x
    }

    return menuState.showMenu && (
        <div className="context-menu" style={style}>
            <ul>
                <li onClick={()=>{
                        setAttribute(menuState.node.row, menuState.node.col, 'start')
                        setContextMenu({showMenu:false})
                        }
                    }><HiArrowCircleRight size={20} style={{color:"green"}}/> Set Start</li>
                <li onClick={()=>{
                        setAttribute(menuState.node.row, menuState.node.col, 'end')
                        setContextMenu({showMenu:false})
                        }
                    }><BiBullseye size={20} style={{color:"red"}}/> Set End</li>
                {<li onClick={()=>{
                        setAttribute(menuState.node.row, menuState.node.col, 'weight')
                        setContextMenu({showMenu:false})
                        }
                    }><FaWeightHanging size={20} style={{color:"black"}}/> Set Weight</li> }
            </ul>
        </div>
    )
}

export default ContextMenu

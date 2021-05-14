import Row from "./Row";

function Container({grid, mouseDown, mouseUp, mouseEnter}) {
    let rows = grid.map((row, idx) => 
        <Row 
            row={row}
            key={"row" + idx}
            mouseUp={mouseUp}
            mouseDown={mouseDown}
            mouseEnter={mouseEnter}
        />)   

    return (
        <div className="container" onMouseUp={mouseUp}>
            {rows}
        </div>
    )
}

export default Container

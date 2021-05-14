import Button from './Button'

function optionsRow({reset, visualize, clear}) {
    return (
        <div className="opt-row">
            <Button text="Clear" color="red" onClick={clear}></Button>
            <Button text="Reset" onClick={reset}></Button>
            <Button text="Visualize" color="green" onClick={visualize}></Button>
        </div>
    )
}

export default optionsRow

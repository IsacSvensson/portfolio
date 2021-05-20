import Button from './Button'
import Slider from './Slider'

function optionsRow({reset, visualize, clear, setAnimationSpeed, animationSpeed}) {
    return (
        <div className="opt-row">
            <Button text="Clear" color="red" onClick={clear}></Button>
            <Button text="Reset" onClick={reset}></Button>
            <Button text="Visualize" color="green" onClick={visualize}></Button>
            <Slider setSpeed={setAnimationSpeed} animationSpeed={animationSpeed}/>
        </div>
    )
}

export default optionsRow

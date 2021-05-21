import { useState } from 'react'
import Button from './Button'
import Slider from './Slider'

function OptionsRow({reset, visualize, clear, setAnimationSpeed, animationSpeed}) {
    const [showSlide, setShowSlide] = useState(false)
    const showSlider = () => setShowSlide(!showSlide)

    let slider ="";

    if (showSlide)
        slider = <Slider setSpeed={setAnimationSpeed} animationSpeed={animationSpeed}/>
    return (
        <div className="opt-row">
            <Button text="Clear" onClick={clear}></Button>
            <Button text="Reset" onClick={reset}></Button>
            <Button text="Visualize" color="green" onClick={visualize}></Button>
            <Button text="Animation Speed" onClick={showSlider}></Button>
            {slider}
        </div>
    )
}

export default OptionsRow

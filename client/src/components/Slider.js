const Slider = ({animationSpeed, setSpeed}) => {

  const handleChange = event => {
    setSpeed(event.target.value);
  };
  return (
    <div>
        <input
        type="range"
        className="slider"
        min={1}
        max={100}
        value={animationSpeed}
        onChange={handleChange}
      />
      <output name="rangeVal">{animationSpeed}%</output>
    </div>
  )
}

export default Slider
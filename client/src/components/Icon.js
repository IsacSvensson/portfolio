function Icon({icon, iconValue, text}) {
    return (
        <div className="icon-box">
            <div className={"icon "+ icon}>{iconValue}</div>
            <p className="icon-desc">{text}</p>
        </div>
    )
}

export default Icon

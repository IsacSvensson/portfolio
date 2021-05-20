const Button = ({ color, text, onClick, align }) => {
    let style = {
        backgroundColor: color,
        float: align
    };

    return <button 
        onClick={onClick}
        style={style} 
        className='btn'

    >
        {text}
    </button> 
}

Button.defaultProps = {
    color: 'steelblue',
}

export default Button

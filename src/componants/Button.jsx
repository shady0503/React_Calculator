function Button(props) {
    return (
        <button 
            className={`button ${props.value === "AC" || props.value === "=" ? "span-two" : ""}`} 
            onClick={() => props.onClick(props.value)}
        >
            {props.value}
        </button>
    );
}

export default Button;

import React, { useState } from 'react';
import Button from "./Button";

function Main() {
    const [currentOperand, setCurrentOperand] = useState("");
    const [previousOperand, setPreviousOperand] = useState("");

    const handleButtonClick = (value) => {
        if(value === "AC") {
            setCurrentOperand("");
            setPreviousOperand("");
        } else if(value === "DEL") {
            setCurrentOperand("");
        } else if(value === "="){
            setCurrentOperand(eval(previousOperand+currentOperand))
            setPreviousOperand("")
        } else if (["*", "+", "/", "-"].includes(value)) {
            if (["*", "+", "/", "-"].includes(previousOperand.slice(-1)) && currentOperand=='') {
            setPreviousOperand(eval(previousOperand.slice(0, -1) + currentOperand) + " " + value);
            } else {
            setPreviousOperand(eval(previousOperand + currentOperand) + " " + value);
            }

            setCurrentOperand("");
        } else {
            setCurrentOperand((currentOperand+value))
        }
    };

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{previousOperand}</div>
                <div className="current-operand">{currentOperand}</div>
            </div>
            {["AC", "DEL", "/", "1", "2", "3", "*", "4", "5", "6", "+", "7", "8", "9", "-", ".", "0", "="].map(value => (
                <Button key={value} value={value} onClick={handleButtonClick} />
            ))}
        </div>
    );
}

export default Main;

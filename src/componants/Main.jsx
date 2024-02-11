import React, { useState } from 'react';
import Button from "./Button";

function Main() {
    const [currentOperand, setCurrentOperand] = useState("");
    const [previousOperand, setPreviousOperand] = useState("");
    const operatorSet = new Set(["*", "+", "/", "-"]);


    const calculate = (expression) => {
        try {
            return new Function('return ' + expression)();
        } catch (e) {
            throw new Error("Invalid expression");
        }
    };

    const handleButtonClick = (value) => {
        if(value === "AC") {
            setCurrentOperand("");
            setPreviousOperand("");
        } else if(value === "DEL") {
            setCurrentOperand(prev => prev.slice(0, -1));
        } else if(value === "="){
            try {
                setCurrentOperand(calculate(previousOperand + currentOperand).toString());
                setPreviousOperand("");
            } catch {
                setCurrentOperand("Error");
                setTimeout(() => setCurrentOperand(""), 1500);
            }
        } else if (operatorSet.has(value)) {
            if (operatorSet.has(previousOperand.slice(-1)) && currentOperand === '') {
                setPreviousOperand(prev => prev.slice(0, -1) + value);
            } else {
                try {
                    setPreviousOperand(calculate(previousOperand + currentOperand) + value);
                } catch {
                    setCurrentOperand("Error");
                    setTimeout(() => {
                        setCurrentOperand("");
                        setPreviousOperand("");
                    }, 1500);
                }
            }
            setCurrentOperand("");
        } else if (value === "." && currentOperand.includes(".")) {}
        else {
            setCurrentOperand(prev => prev + value);
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

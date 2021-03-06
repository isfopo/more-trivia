import React from 'react'
import "../styles/ChoiceDisplay.css";

export const ChoiceDisplay = props => {

    function decode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }

    const orderStyle = [
        {
            order: `${ props.order[0]}`
        },
        {
            order: `${ props.order[1]}`
        },
        {
            order: `${props.order[2]}`
        },
        {
            order: `${props.order[3]}`
        },
    ]

    const submitAnswer = (selection) => {
        if (selection === 0 && props.isAsking) {
            props.increaseScore();
        } else {
            props.setSelected(selection);
        }
        props.setIsAsking(false);
    }

    return (
        <div className="choiceDisplay">

            <button 
                className={`btn ${ !props.isAsking && "correct"}`}
                onClick={() => submitAnswer(0)}
                style={orderStyle[0]} >{decode(props.correct)}</button>

            <button 
                className={`btn ${ !props.isAsking && `${ props.selected === 1 ? "incorrect" : "disabled"}`}`}
                onClick={() => submitAnswer(1)}
                style={orderStyle[1]} >{decode(props.incorrect[0])}</button>

            { props.incorrect.length >= 2 &&
                <button 
                    className={`btn ${ !props.isAsking && `${ props.selected === 2 ? "incorrect" : "disabled"}`}`}
                    onClick={() => submitAnswer(2)}
                    style={orderStyle[2]} >{decode(props.incorrect[1])}</button>
            }

            { props.incorrect.length === 3 &&
                <button 
                    className={`btn ${ !props.isAsking && `${ props.selected === 3 ? "incorrect" : "disabled"}`}`}
                    onClick={() => submitAnswer(3)}
                    style={orderStyle[3]} >{decode(props.incorrect[2])}</button>
            }
        </div>
    )
}

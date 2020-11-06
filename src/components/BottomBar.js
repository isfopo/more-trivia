import React from 'react'
import "../styles/BottomBar.css";

import restart from "../icons/autorenew-24px.svg";
import next from "../icons/arrow_forward_ios-24px.svg";

export const BottomBar = props => {
    return (
        <div className="bottomBar">
            <button 
                style={{visibility: props.canRestart ? "visible" : "hidden"}}
                className="restartButton" 
                onClick={() => props.restart()}>
                    <img src={restart} alt="Restart" />
            </button>
        

            <button 
                style={{visibility: props.canNext ? "visible" : "hidden"}}
                className="nextButton" 
                onClick={() => props.next()}>
                    <img src={next} alt="Next" />
            </button>
            
        </div>
    )
}

import React from 'react'
import "../styles/ScoreDisplay.css";

export const ScoreDisplay = props => {
    return (
        <div className={`scoreDisplay ${props.showFinal && "finalScoreDisplay" }`}>
            { props.showFinal &&
                <h2>Your score:</h2>
            }
            <h1>{props.score}</h1>
        </div>
    )
}

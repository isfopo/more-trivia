import React from 'react'

export const TotalQuestionInput = props => {

    return (
        <div className="totalQuestionInput">
            <label htmlFor="Number of Questions">Number of Questions</label>
            <input 
                onChange={ e => props.handleSetTotalQuestions(parseInt(e.target.value))}
                type="number" 
                id="Number of Questions" 
                name="Number of Questions"
                defaultValue="10"
                min="1" max="50"
            />
        </div>
    )
}

import React from 'react'

export const DifficultyDropdown = props => {
    
    return (
        <div className="difficultyMenu">
            <label htmlFor="difficulty">Difficulty</label>
            <select name="Difficulty" id="difficulty" onChange={ e => props.handleSetDifficulty(e.target.value)}>
            
                <option value="0">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>

            </select>        
        </div>
    )
}

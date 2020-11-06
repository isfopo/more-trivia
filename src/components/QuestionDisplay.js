import React from 'react'

export const QuestionDisplay = props => {

    function decode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }
      

    return (
        <div className="question">
            <p>{decode( props.question )}</p>
        </div>
    )
}

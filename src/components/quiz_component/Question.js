import React from 'react'

const Question = (props) => {
    return (
        <div>
            <div className='question-container'>
                <h3>{props.questiontext}</h3>
            </div>

        </div>
    )
}

export default Question
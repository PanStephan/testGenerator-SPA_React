import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
  const{answers, onAnswerClick, state} = props
  return (
    <ul className={classes.AnswersList}>
      { answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={onAnswerClick}
            state={state ? state[answer.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default AnswersList
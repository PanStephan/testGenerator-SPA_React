import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
  const{answerNumber, question, quizLength, state, answers, onAnswerClick} = props
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
      <span>
        <strong>{answerNumber}.</strong>&nbsp;
        {question}
      </span>

        <small>{answerNumber} из { quizLength }</small>
      </p>

      <AnswersList
        state={state}
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    </div>
  )
}

export default ActiveQuiz
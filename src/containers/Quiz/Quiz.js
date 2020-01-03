import React, {useState} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import {connect} from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

const Quiz = (props) => {

  const{match, fetchQuizById, retryQuiz, loading, results, isFinished, activeQuestion, answerState, quiz, quizAnswerClick} = props

  useState(() => {
    fetchQuizById(match.params.id)
    retryQuiz()
  }, [quiz])

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
            {
            loading || !quiz
            ? <Loader/> 
            : 
            isFinished
            ? <FinishedQuiz
              results={results}
              quiz={quiz}
              onRetry={retryQuiz}
            />
            : <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={quizAnswerClick}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
              />
          }
        </div>
      </div>
    )
}

function mapStateToProps(state) {
  const{loading, results, isFinished, activeQuestion, answerState, quiz} = state.quiz
  return {
    loading,
    results, 
    isFinished,
    activeQuestion,
    answerState,
    quiz
  }
}

const mapDispatchToProps = {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
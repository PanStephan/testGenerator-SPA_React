import axios from 'axios'
import { QUIZ_RETRY, QUIZ_NEXT_QUESTION, FINISH_QUIZ, QUIZ_SET_STATE, FETCH_QUIZES_START, FETCH_QUIZES_ERROR, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS } from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const res = await axios.get('https://react-testgenerator.firebaseio.com/quizes.json')
      const quizes = []
      Object.keys(res.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test-${index+1}`
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch(e) {
      dispatch(fetchQuizesError())
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: error
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const res = await axios.get(`https://react-testgenerator.firebaseio.com/quizes/${quizId}.json`)
      const quiz = res.data

      dispatch(fetchQuizeSuccess(quiz))
    } catch(e) {
      dispatch(fetchQuizesError(e))
    }

  }
}

export function fetchQuizeSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }

}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz 
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}
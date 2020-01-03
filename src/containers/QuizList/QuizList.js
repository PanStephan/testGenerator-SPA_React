import React, {useEffect} from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'

const QuizList = (props) => {

  const{fetchQuizes, quizes, loading} = props

  useEffect(() => {
    fetchQuizes()
  }, [])


  const renderQuizes = () => {
    return quizes.map( quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {
          loading && quizes.length !== 0  ? <Loader/> : 
            <ul>
              { renderQuizes() }
            </ul>
        }
      </div>
    </div>  
  )
}

function mapStateToProps(state) {
  const{quizes, loading} = state.quiz
  return {
    quizes: quizes,
    loading: loading
  }
}

const mapDispatchToProps = {
  fetchQuizes
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
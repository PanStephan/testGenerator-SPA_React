import React, {useState} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

const QuizCreator = (props) => {

  const{quiz, createQuizQuestion, finishCreateQuiz} = props

  const[rightAnswerId, setRightAnswerId] = useState(1)
  const[isFormValid, setIsFormValid] = useState(false)
  const[formControls, setFormControls] = useState(createFormControls())

  const clearStates = () => {
    setRightAnswerId(1)
    setIsFormValid(false)
    setFormControls(createFormControls())
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  const addQuestionHandler = () => {
    const{option1, option2, option3, option4, question} = formControls
    const questionItem = {
      question: question.value,
      id: quiz.length+1, 
      rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    createQuizQuestion(questionItem)
    clearStates()
  }

  const createQuizHandler = () => {
    finishCreateQuiz()
    clearStates()
  }

  const changeHandler = (value, controlName) => {
    const formControlsState = {...formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControlsState[controlName] = control

    setFormControls(formControlsState)
    setIsFormValid(validateForm(formControlsState))
  }


  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]
      const{label, value, valid, validation, touched, errorMessage} = control

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={label}
            value={value}
            valid={valid}
            shouldValidate={!!validation}
            touched={touched}
            errorMessage={errorMessage}
            onChange={event => changeHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </Auxiliary>
      )
    })
  }

  const selectChangeHandler = event => {setRightAnswerId(+event.target.value)}

    const select = <Select
      label="Выберите правильный ответ"
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>

          { renderControls() }

          { select }

          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>

          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={quiz.length === 0}
          >
            Создать тест
          </Button>

        </form>
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

const mapDispatchToProps = {
  createQuizQuestion,
  finishCreateQuiz
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
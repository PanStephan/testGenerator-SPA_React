import React, {useState} from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'


const Auth = (props) => {

  const{auth} = props

  const formControl = {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }

  const[isFormValid, setIsFormValid] = useState(false)
  const[formControls, setFormControls] = useState(formControl)


  const loginHandler = () => {
    const{email, password} = formControls
    auth(
      email.value,
      password.value,
      true
    )
  }

  const registerHandler = () => {
    const{email, password} = formControls
    auth(
      email.value,
      password.value,
      false
    )
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const formControlState = { ...formControls }
    const control = { ...formControlState[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControlState[controlName] = control

    let isFormValid = true

    Object.keys(formControlState).forEach(name => {
      isFormValid = formControlState[name].valid && isFormValid
    })

    setIsFormValid(isFormValid)
    setFormControls(formControlState)
  }

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const{type, value, valid, touched, label, validation, errorMessage} = formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={type}
          value={value}
          valid={valid}
          touched={touched}
          label={label}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>

        <form onSubmit={submitHandler} className={classes.AuthForm}>

          { renderInputs() }

          <Button
            type="success"
            onClick={loginHandler}
            disabled={!isFormValid}
          >
            Войти
          </Button>

          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  )

}

const mapDispatchToProps = {
  auth
}

export default connect(null, mapDispatchToProps)(Auth)
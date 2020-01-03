import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../../store/actions/auth'

const Logout = (props) => {

  const{logout} = props

  useEffect(() => {
    logout()
  }, [])


  return (
    <Redirect to={'/'}/>
  )
}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Logout)
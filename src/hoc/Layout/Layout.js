import React, {useState} from 'react'
import classes from './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux'

const Layout = (props) => {

  const{isAuthenticated, children} = props

  const[menu, setMenu] = useState(false)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const menuCloseHandler = () => {
    setMenu(false)
  }

  return (
    <div className={classes.Layout}>

      <Drawer
        isAuthenticated={isAuthenticated}
        isOpen={menu}
        onClose={menuCloseHandler}
      />

      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />

      <main>
        { children }
      </main>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}
 
export default connect(mapStateToProps)(Layout)
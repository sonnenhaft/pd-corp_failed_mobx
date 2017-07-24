import React from 'react'
import { connect } from 'react-redux'
import {
  NavLink,
  withRouter
} from 'react-router-dom'

import styles from './Header.scss'
import { compose } from 'recompose'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

const stableLinks = [
  { link: '/assets', value: 'assets' },
  { link: '/users', value: 'users' },
  { link: '/wands', value: 'wands' },
  { link: '/key_locations', value: 'key locations' }
]

import logo from './logo.png'

const Header = ({ user: { name: username } }) => {
  return <div styleName="header-width-wrapper">
    <hr/>
    <div styleName="header-wrapper">
      <img src={logo} styleName="logo"/>
      <div styleName="header">
        {stableLinks.map(({ link, value }) => {
          return <NavLink title={value} key={value}
                          replace to={link} exact
                          activeClassName={styles['active']}>{value}</NavLink>
        })}
      </div>
      <DropDownMenu value={username} styleName="username">
        <MenuItem value={username} primaryText={username}/>
        <MenuItem value={username} primaryText={username}/>
      </DropDownMenu>
    </div>
  </div>
}

export default compose(
  withRouter,
  connect(({ user }) => ({ user }))
)(Header)

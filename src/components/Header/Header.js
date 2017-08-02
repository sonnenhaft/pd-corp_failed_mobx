import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose, onlyUpdateForKeys } from 'recompose'
import { DropDownMenu, MenuItem } from 'material-ui'

import styles from './Header.css'
import logoIcon from './logo-icon.png'

const stableLinks = [
  { link: '/assets', value: 'assets' },
  { link: '/users', value: 'users' },
  { link: '/wands', value: 'wands' },
  { link: '/key_locations', value: 'key locations' }
]

const Header = ({ user: { name: username } }) => <div
  styleName="header-width-wrapper">
  <hr/>
  <div styleName="header-wrapper">
    <div styleName="logo">
      <img src={logoIcon}/>
    </div>
    <div styleName="header">
      {stableLinks.map(({ link, value }) => <NavLink
        key={value} title={value} activeClassName={styles['active']}
        to={link} replace exact>{value}</NavLink>)}
    </div>

    <DropDownMenu value={username} styleName="username">
      <MenuItem value={username} primaryText={username}/>
      <MenuItem value={username} primaryText={username}/>
    </DropDownMenu>
  </div>
</div>

export default compose(
  withRouter,
  connect(({ user }) => ({ user })),
  onlyUpdateForKeys(['user', 'location'])
)(Header)

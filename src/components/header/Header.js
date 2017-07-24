import React from 'react'
import { connect } from 'react-redux'
import {
  NavLink,
  withRouter
} from 'react-router-dom'

import styles from './Header.scss'
import { compose } from 'recompose'

const stableLinks = [
  { link: '/', value: 'root' },
  { link: '/route1', value: 'link 1' },
  { link: '/route2', value: 'link 2' },
  { link: '/route3', value: 'link 3' }
]

const Header = () => {
  return <div styleName="header-wrapper">
    Header
    <div styleName="header">
      {stableLinks.map(({ link, value }) => {
        return <NavLink title={value} key={value}
                        replace to={link} exact
                        activeClassName={styles['active']}>{value}</NavLink>
      })}
    </div>
  </div>
}

export default compose(
  withRouter,
  connect(({ user }) => ({ user }))
)(Header)

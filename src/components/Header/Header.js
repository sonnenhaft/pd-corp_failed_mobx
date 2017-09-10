import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { compose, onlyUpdateForKeys } from 'recompose'
import styles from './Header.css'
import logoIcon from './logo-icon.png'
import { FontIcon, MenuItem } from 'react-toolbox'
import { MenuButton } from 'common'
import { user } from 'mobx-stores'

const globalProjectLinks = [
  { link: '/assets', label: 'assets' },
  { link: '/users', label: 'users' },
  { link: '/wands', label: 'wands' },
  { link: '/key-locations', label: 'key locations' },
  { link: '/stationary-readers', label: 'Stationary Readers' }
]

/**
 * Global header component. If is not sticky at this point.
 * Stores info about global links and current username.
 * Username is done in menu-style, right now contains one
 * "logout" link.
 */
const Header = () => <div styleName="header-width-wrapper">
  <hr/>
  <div styleName="header-wrapper">
    <div styleName="logo">
      <img src={ logoIcon }/>
    </div>
    <div styleName="header">
      {globalProjectLinks.map(({ link, label }) => <NavLink
        key={ label } title={ label } activeClassName={ styles['active'] }
        to={ link }>{label}</NavLink>)}
    </div>

    <MenuButton label={ user.username } styleName="username" primary
                icon={ active => <FontIcon value={ active ? 'arrow_drop_up' : 'arrow_drop_down' }/> }>
      {/*<MenuItem value='download' icon='get_app' caption={ username } disabled/>*/}
      <MenuItem value='Logout' caption='Logout' onClick={ () => user.logout() }/>
    </MenuButton>
  </div>
</div>

export default compose(
  // Injects react-router.
  withRouter,
  // Means that will not rerender on anything except
  // location router change.
  onlyUpdateForKeys(['location'])
)(Header)

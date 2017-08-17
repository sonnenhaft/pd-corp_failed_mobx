import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { compose, onlyUpdateForKeys } from 'recompose'
import styles from './Header.css'
import logoIcon from './logo-icon.png'
import { FontIcon, MenuItem } from 'react-toolbox'
import { MenuButton } from 'common'

const stableLinks = [
  { link: '/assets', value: 'assets' },
  { link: '/users', value: 'users' },
  { link: '/wands', value: 'wands' },
  { link: '/key-locations', value: 'key locations' },
  { link: '/stationary-readers', value: 'Stationary Readers' }
]

const Header = ({ username = 'John Doe' }) => <div
  styleName="header-width-wrapper">
  <hr/>
  <div styleName="header-wrapper">
    <div styleName="logo">
      <img src={ logoIcon }/>
    </div>
    <div styleName="header">
      {stableLinks.map(({ link, value }) => <NavLink
        key={ value } title={ value } activeClassName={ styles['active'] }
        to={ link }>{value}</NavLink>)}
    </div>

    <MenuButton label={ username } styleName="username" primary
                icon={ active => <FontIcon value={ active ? 'arrow_drop_up' : 'arrow_drop_down' }/> }>
      <MenuItem value='download' icon='get_app' caption={ username }/>
      <MenuItem value='help' icon='favorite' caption='Favorite'/>
      <MenuItem value='settings' icon='open_in_browser' caption='Open in app'/>
      <MenuItem value='signout' icon='delete' caption='Delete' disabled/>
    </MenuButton>
  </div>
</div>

export default compose(
  withRouter,
  onlyUpdateForKeys(['location'])
)(Header)

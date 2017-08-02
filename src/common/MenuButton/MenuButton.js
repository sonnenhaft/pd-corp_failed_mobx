import React from 'react'
import { compose, withState } from 'recompose'
import { Button, Menu } from 'react-toolbox'
import './MenuButton.css'

const MenuButton = ({ active, setActive, children, icon, ...props }) => <div styleName="menu-button">
  <Button onClick={() => setActive(!active)} {...props}>
    {icon(active)}
  </Button>
  <div styleName="menu-wrapper">
    <Menu position="topRight" active={active} onHide={() => setActive(false)}>
      {children}
    </Menu>
  </div>
</div>

export default compose(
  withState('active', 'setActive', false)
)(MenuButton)

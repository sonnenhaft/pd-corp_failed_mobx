import React from 'react'
import { mobxConnect } from 'mobx-stores'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Notifications.css'
import { FontIcon, IconButton } from 'react-toolbox'

const Notifications = mobxConnect('notifications')(({ notifications }) => {
  const list = notifications.list
  return <ReactCSSTransitionGroup
    component="div"
    styleName="notification-wrapper"
    transitionName="notification"
    transitionEnterTimeout={ 500 }
    transitionLeaveTimeout={ 500 }>
    {list.map(notification => (<div
      styleName="notification"
      className={ notification.type }
      key={ notification.index }>
      <div styleName="text-wrapper">
        <FontIcon value={ notification.type === 'success' ? 'check_circle' : 'error_outline' }/>
        {notification.text}
      </div>

      <IconButton onClick={ () => notifications.remove(notification) }>
        <FontIcon value="close" style={ { color: 'white' } }/>
      </IconButton>
    </div>))}
  </ReactCSSTransitionGroup>
})

export default Notifications

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
    transitionEnterTimeout={ 300 }
    transitionLeaveTimeout={ 300 }>
    {list.map((notification, i) => (<div
      styleName="notification"
      className={ notification.type }
      key={ i }>
      <div styleName="text-wrapper">
        {notification.type === 'success' && <FontIcon value="check_circle"/>}
        {notification.type === 'error' && <FontIcon value="error_outline"/>}
        {notification.text}
      </div>

      <IconButton onClick={ () => notifications.remove(notification) }>
        <FontIcon value="close" style={ { color: 'white' } }/>
      </IconButton>
    </div>))}
  </ReactCSSTransitionGroup>
})

export default Notifications

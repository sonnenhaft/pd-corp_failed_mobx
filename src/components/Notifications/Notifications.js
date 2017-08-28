import React from 'react'
import { mobxConnect } from 'mobx-stores'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './notifications.css'

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
      {notification.text}
      <button onClick={ () => notifications.remove(notification) }>remove</button>
    </div>))}
  </ReactCSSTransitionGroup>
})

export default Notifications

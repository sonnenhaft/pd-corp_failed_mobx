import React from 'react'
import { mobxConnect } from 'mobx-stores'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Notifications.css'
import { FontIcon, IconButton } from 'react-toolbox'

/**
 * Component that shows error and success notifications.
 * It is basing on notifications MobX store
 * @see mobx-stores/Notifications.store.js
 * It should be single in this project because is using "fixed" styles.
 *
 * Please don't leave any logic in here except rendering one.
 * All timeout and other logic should be kept in MobX store.
 */
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

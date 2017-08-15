import React from 'react'
import RcTooltip from 'rc-tooltip'
import styles from './Tooltip.css'

export const Tooltip = ({ children, text, noArrow }) => <RcTooltip
  placement={noArrow ? 'bottom' : 'top'}
  trigger={['hover']}
  overlay={text}
  overlayClassName={`${styles['custom-tooltip']} ${noArrow ? styles['no-arrow'] : ''}`}>
  {children}
</RcTooltip>


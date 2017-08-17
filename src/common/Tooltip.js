import React from 'react'
import RcTooltip from 'rc-tooltip'
import P from 'prop-types'

import styles from './Tooltip.css'

export const Tooltip = ({ children, text, noArrow }) => <RcTooltip
  placement={noArrow ? 'bottom' : 'top'}
  trigger={['hover']}
  overlay={text}
  overlayClassName={`${styles['custom-tooltip']} ${noArrow ? styles['no-arrow'] : ''}`}>
  {children}
</RcTooltip>

Tooltip.propTypes = {
  children: P.element.isRequired,
  text: P.string.isRequired,
  noArrow: P.bool
}


import React from 'react'
import RcTooltip from 'rc-tooltip'
import P from 'prop-types'

import styles from './Tooltip.css'
import { FontIcon } from 'react-toolbox'

export const Tooltip = ({ children, text, noArrow, circle, className }) => {
  let content = children
  if ( circle ) {
    content = <div styleName="info-tip" className={ className }>
      <FontIcon value="info_outline"/>
      <FontIcon value="info"/>
    </div>
    noArrow = true
  }
  return <RcTooltip
    placement={ noArrow ? 'bottom' : 'top' }
    trigger={ ['hover'] }
    overlay={ text }
    overlayClassName={ `${ styles['custom-tooltip'] } ${ noArrow ? styles['no-arrow'] : '' }` }>
    {content}
  </RcTooltip>
}

Tooltip.propTypes = {
  children: P.element,
  text: P.string.isRequired,
  noArrow: P.bool
}



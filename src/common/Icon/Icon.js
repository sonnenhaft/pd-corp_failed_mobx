import React from 'react'
import P from 'prop-types'
import { IconButton as RtIconButton } from 'react-toolbox/lib/button'

import styles from './Icon.css'

export const Icon = ({ svg, className, ...props }) => <span
  { ...{ ...props, className } }
  className={ `${ styles['icon'] } ${ className }` }
  dangerouslySetInnerHTML={ { __html: svg } }/>

Icon.propTypes = {
  svg: P.string.isRequired,
  className: P.string
}

export const IconButton = ({ svg }) => <RtIconButton
  style={ { position: 'relative' } }
  icon={
    <Icon svg={ svg } styleName="icon-button"/>
  } primary ripple/>

IconButton.propTypes = {
  svg: P.string.isRequired
}

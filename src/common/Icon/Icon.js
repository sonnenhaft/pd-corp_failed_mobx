import React from 'react'
import styles from './Icon.css'
import { IconButton as RtIconButton } from 'react-toolbox/lib/button'

export const Icon = ({ svg, className, ...props }) => <span
  {...{ ...props, className }}
  className={`${styles['icon']} ${className}`}
  dangerouslySetInnerHTML={{ __html: svg }}/>

export const IconButton = ({ svg }) => <RtIconButton
  style={{position: 'relative'}}
  icon={
    <Icon svg={svg} styleName="icon-button"/>
  } primary ripple/>

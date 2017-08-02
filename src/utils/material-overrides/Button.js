import React from 'react'
import styles from './Button.scss'
import { Button as RtButton } from 'react-toolbox/lib/button'

export const Button = ({ children, onClick, disabled, className, primary }) => {
  return <RtButton
    {...{ onClick, primary, disabled }}
    className={`${styles['global-button']} ${className} ${primary ? styles['primary'] : ''}`}
    raised>
    {children}
  </RtButton>
}


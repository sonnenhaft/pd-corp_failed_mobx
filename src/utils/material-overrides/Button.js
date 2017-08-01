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
  //   borderRadius: '4px',
  //   fontSize: '13px',
  //   height: '32px',
  //   lineHeight: '32px',
  //   fontWeight: primary ? 'bold' : 'normal',
  //   color: primary ? '#ffffff' : '#004890'
  // overlayStyle={{padding: '0 16px'}}
}


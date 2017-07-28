import React from 'react'
import './Button.scss'
import { RaisedButton } from 'material-ui'

export const Button = ({ children, onClick, disabled, className, primary }) => {
  return <RaisedButton
    className={`global-button ${className}`}
    fullWidth={true}
    style={{minWidth: 'auto'}}
    buttonStyle={{
      borderRadius: '4px',
      fontSize: '13px',
      height: '32px',
      lineHeight: '32px',
      fontWeight: primary ? 'bold' : 'normal',
      color: primary ? '#ffffff' : '#004890'
    }}
    overlayStyle={{padding: '0 16px'}}
    {...{ onClick, disabled, primary }}>
    {children}
  </RaisedButton>
}

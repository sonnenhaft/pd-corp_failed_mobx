import React from 'react'
import RcTooltip from 'rc-tooltip'
import './Tooltip.css'

export const Tooltip = ({ children, text }) => {
  return <RcTooltip placement="top" trigger={['click']} overlay={text}>
    {children}
  </RcTooltip>
}

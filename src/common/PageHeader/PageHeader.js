import React from 'react'
import './PageHeader.css'

export const PageHeader = ({ children, className }) => <div
  styleName="page-header"
  className={ className }>
  <div styleName="page-header-wrapper">{children}</div>
</div>

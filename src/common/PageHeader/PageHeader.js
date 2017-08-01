import React from 'react'
import './PageHeader.scss'

export const PageHeader = ({ children }) => <div styleName="page-header">
  <div styleName="page-header-wrapper">{children}</div>
</div>

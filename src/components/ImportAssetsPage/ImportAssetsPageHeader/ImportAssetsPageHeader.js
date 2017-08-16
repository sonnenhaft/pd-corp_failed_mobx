import React from 'react'
import { compose } from 'recompose'
import { NavLink, withRouter } from 'react-router-dom'

import { PageHeader } from 'common'
import './ImportAssetsPageHeader.css'

const AssetsPageHeader = () => <PageHeader>
  <div styleName="header-text">IMPORT ASSET</div>
  <div>
    <NavLink to={'/assets'}>
      back
    </NavLink>
  </div>
</PageHeader>

export default compose(
  withRouter
)(AssetsPageHeader)

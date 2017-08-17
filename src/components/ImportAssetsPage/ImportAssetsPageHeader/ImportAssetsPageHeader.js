import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { PageHeader } from 'common'
import { Button, FontIcon } from 'react-toolbox'

import './ImportAssetsPageHeader.css'

const AssetsPageHeader = () => <PageHeader styleName="header">
  <div>
    <NavLink to="/assets">
      <Button raised styleName="back-link">
        <FontIcon value="chevron_left"/>
      </Button>
    </NavLink>
    <span styleName="header-text">IMPORT ASSET</span>
  </div>
</PageHeader>

export default compose(
  withRouter
)(AssetsPageHeader)

import React from 'react'
import { compose } from 'recompose'
import Button from 'react-toolbox/lib/button'
import { NavLink, withRouter } from 'react-router-dom'

import { Icon, PageHeader } from 'common'
import createAssetSvg from './create-asset.icon.svg'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './AssetsPageHeader.css'

const AssetsPageHeader = () => <PageHeader>
  <div styleName="header-text">ASSETS</div>
  <div>
    <NavLink to={'/assets/create'}>
      <Button raised>
        <Icon svg={createAssetSvg}/>
        Create Asset
      </Button>
    </NavLink>

    <NavLink to={'/assets/import'} styleName="middle-button">
      <Button raised>
        <Icon svg={importAssetsSvg}/>
        Import Assets
      </Button>
    </NavLink>

    <Button raised onClick={() => alert('define export report action')}>
      <Icon svg={exportReportSvg}/>
      Export Report
    </Button>
  </div>
</PageHeader>

export default compose(
  withRouter
)(AssetsPageHeader)

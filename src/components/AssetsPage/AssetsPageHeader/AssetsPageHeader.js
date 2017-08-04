import React from 'react'
import { compose } from 'recompose'
import Button from 'react-toolbox/lib/button'
import { NavLink, withRouter } from 'react-router-dom'

import { Icon, PageHeader } from 'common'
import createAssetSvg from './create-asset.icon.svg'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './AssetsPageHeader.css'

const AssetsPageHeader = ({ location }) => <PageHeader>
  <div styleName="header-text">ASSETS</div>
  <div>
    <NavLink to={`${location.pathname}/create`}>
      <Button raised>
        <Icon svg={createAssetSvg}/>
        Create Asset
      </Button>
    </NavLink>

    <Button raised onClick={() => alert('define import assets action')}
            styleName="middle-button">
      <Icon svg={importAssetsSvg}/>
      Import Assets
    </Button>

    <Button raised onClick={() => alert('define export report action')}>
      <Icon svg={exportReportSvg}/>
      Export Report
    </Button>
  </div>
</PageHeader>

export default compose(
  withRouter
)(AssetsPageHeader)

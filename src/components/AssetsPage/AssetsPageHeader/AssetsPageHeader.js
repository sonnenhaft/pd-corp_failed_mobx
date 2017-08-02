import React from 'react'
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose'
import Button from 'react-toolbox/lib/button'
import { NavLink, withRouter } from 'react-router-dom'

import { Icon, PageHeader } from 'common'
import createAssetSvg from './create-asset.icon.svg'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './AssetsPageHeader.css'

const AssetsPageHeader = ({ alertTodo, location }) => <PageHeader>
  <div styleName="header-text">ASSETS</div>
  <div>
    <NavLink to={`${location.pathname}/create`} replace exact>
      <Button raised>
        <Icon svg={createAssetSvg}/>
        Create Asset
      </Button>
    </NavLink>

    <Button raised onClick={() => alertTodo('define import assets action')}
            styleName="middle-button">
      <Icon svg={importAssetsSvg}/>
      Import Assets
    </Button>

    <Button raised onClick={() => alertTodo('define export report action')}>
      <Icon svg={exportReportSvg}/>
      Export Report
    </Button>
  </div>
</PageHeader>

export default compose(
  withRouter,
  onlyUpdateForKeys(['location']),
  withHandlers({
    alertTodo: () => text => window.alert(`//TODO(vlad): ${ text }`)
  })
)(AssetsPageHeader)

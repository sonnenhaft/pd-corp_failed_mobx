import React from 'react'
import { compose, onlyUpdateForKeys, withHandlers, withProps } from 'recompose'
import Button from 'react-toolbox/lib/button'
import { NavLink, withRouter } from 'react-router-dom'

import { Icon, PageHeader } from 'common'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './EditAssetPageHeader.css'

const EditAssetsPageHeader = ({ alertTodo, assetId }) => <PageHeader>
  <div styleName="header-text">
    <NavLink to="/assets" replace exact style={{ color: 'white' }}>back</NavLink>
    {!assetId && <span>CREATE ASSET</span>}
    {assetId && <span>| asset name in here</span>}
  </div>
  {assetId && <div>
    <Button raised onClick={() => alertTodo('define Update Asset action')}
            styleName="middle-button">
      <Icon svg={importAssetsSvg}/>
      Update Asset
    </Button>
    <Button raised onClick={() => alertTodo('define Delete Asset action')}>
      <Icon svg={exportReportSvg}/>
      Delete Asset
    </Button>
  </div>}
</PageHeader>

export default compose(
  withRouter,
  withProps(({ match: { params: { assetId } } }) => ({ assetId })),
  onlyUpdateForKeys(['assetId']),
  withHandlers({
    alertTodo: () => text => window.alert(`//TODO(vlad): ${ text }`)
  })
)(EditAssetsPageHeader)

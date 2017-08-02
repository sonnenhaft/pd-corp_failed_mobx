import React from 'react'
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose'
import Button from 'react-toolbox/lib/button'
import { PageHeader } from 'common'
import { Icon } from 'common'

import createAssetSvg from './create-asset.icon.svg'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './AssetsPageHeader.css'

const AssetsPageHeader = ({ alertTodo }) => <PageHeader>
  <div styleName="header-text">ASSETS</div>
  <div>
    <Button raised onClick={() => alertTodo('define create asset action')}>
      <Icon svg={createAssetSvg}/>
      Create Asset
    </Button>

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
  onlyUpdateForKeys([]),
  withHandlers({
    alertTodo: () => text => window.alert(`//TODO(vlad): ${ text }`)
  })
)(AssetsPageHeader)

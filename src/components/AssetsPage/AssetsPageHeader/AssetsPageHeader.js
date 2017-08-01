import React from 'react'
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose'
import { Button } from 'utils'
import { PageHeader } from 'common/PageHeader'
import { Icon } from 'common/Icon'

import createAssetSvg from './create-asset.icon.svg'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './AssetsPageHeader.scss'

const AssetsPageHeader = ({ alertTodo }) => <PageHeader>
  <div styleName="header-text">ASSETS</div>
  <div>
    <Button onClick={() => alertTodo('define create asset action')}>
      <Icon svg={createAssetSvg}/>
      Create Asset
    </Button>

    <Button onClick={() => alertTodo('define import assets action')}
            styleName="middle-button">
      <Icon svg={importAssetsSvg}/>
      Import Assets
    </Button>
    <Button onClick={() => alertTodo('define export report action')}>
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

import React from 'react'
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose'
import Button from 'react-toolbox/lib/button'
import { PageHeader } from 'common'
import { Icon } from 'common'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './EditAssetPageHeader.css'

const EditAssetsPageHeader = ({ alertTodo }) => <PageHeader>
  <div styleName="header-text">
    back | asset name in here
  </div>
  <div>
    <Button raised onClick={() => alertTodo('define Update Asset action')}
            styleName="middle-button">
      <Icon svg={importAssetsSvg}/>
      Update Asset
    </Button>
    <Button raised onClick={() => alertTodo('define Delete Asset action')}>
      <Icon svg={exportReportSvg}/>
      Delete Asset
    </Button>
  </div>
</PageHeader>

export default compose(
  onlyUpdateForKeys([]),
  withHandlers({
    alertTodo: () => text => window.alert(`//TODO(vlad): ${ text }`)
  })
)(EditAssetsPageHeader)

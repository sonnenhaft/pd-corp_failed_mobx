import React from 'react'
import {
  compose,
  onlyUpdateForKeys,
  withHandlers
} from 'recompose'
import './AssetsPageHeader.scss'
import { Button } from 'utils'
import createAssetSvg from './create-asset.icon.svg'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'

const Icon = ({ svg, className }) => <span {...{ className }} dangerouslySetInnerHTML={{ __html: svg }}/>

const AssetsPageHeader = ({ alertTodo }) => <div styleName="assets-header-width-wrapper">
  <div styleName="assets-header-wrapper">
    <div>ASSETS</div>
    <div styleName="buttons">
      <Button onClick={() => alertTodo('define create asset action')}>
        <Icon svg={createAssetSvg} styleName="icon"/>
        Create Asset
      </Button>
      <Button onClick={() => alertTodo('define import assets action')}>
        <Icon svg={importAssetsSvg} styleName="icon"/>
        Import Assets
      </Button>
      <Button onClick={() => alertTodo('define export report action')}>
        <Icon svg={exportReportSvg} styleName="icon"/>
        Export Report
      </Button>
    </div>
  </div>
</div>

export default compose(
  // TODO: note that this wont be updated
  onlyUpdateForKeys([]),
  withHandlers({
    alertTodo: () => text => window.alert(`//TODO(vlad): ${  text}`)
  })
)(AssetsPageHeader)

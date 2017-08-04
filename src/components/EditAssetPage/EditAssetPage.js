import React from 'react'
import { connect } from 'react-redux'
import { compose, onlyUpdateForKeys, withHandlers, withProps } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'
import { Card } from 'react-toolbox'

import AssetsPageHeader from './EditAssetPageHeader'
import { TextInput } from 'common'

import EditAssetInput from './EditAssetInput'

import './EditAssetPage.css'
import { updateAssetSuccess as updateAsset } from 'redux/asset.actions'

const EditAssetPage = ({ keyChanged, asset = {} }) => <div>
  <AssetsPageHeader/>
  <Card styleName="page-wrapper">
    <div styleName="header">
      <NavLink to="/assets">Asset</NavLink>
      <div styleName="dot"/>
      <Route path="/assets/edit/:assetId" component={() => <span>Update Asset</span>}/>
      <Route path="/assets/view/:assetId" component={() => <span>{asset.asset_name}</span>}/>
      <Route path="/assets/create" component={() => <span>Create Asset</span>}/>
    </div>
    <div styleName="edit-asset-page-content">
      <EditAssetInput/>
      <div style={{ paddingLeft: '32px' }}>
        <div styleName="asset-fields">
          <TextInput label="Asset Name" onChange={keyChanged('asset_name')} value={asset.asset_name || ''}/>
          <TextInput label="Serial Number" onChange={keyChanged('serialNumber')} value={asset.serialNumber || ''}/>
          <TextInput label="Asset Type" onChange={keyChanged('asset_type')} value={asset.asset_type || ''}/>
          <TextInput label="Legacy Asset Number" onChange={keyChanged('rfid')} value={asset.rfid || ''}/>
          <TextInput label="Model Name" onChange={keyChanged('model')} value={asset.model || ''}/>
          <TextInput label="Manufacturer" onChange={keyChanged('manufacturer')} value={asset.manufacturer || ''}/>
        </div>
        <TextInput label="Notes" onChange={keyChanged('notes')} value={asset.notes || ''}/>
      </div>
    </div>
  </Card>
</div>

export default compose(
  withRouter,
  withProps(({ match: { params: { assetId } } }) => ({ assetId })),
  onlyUpdateForKeys(['assetId']),
  connect(
    ({ user, assets: { list, activeId } }) => ({ user, list, activeId }),
    { updateAsset }
  ),
  withProps(({ list, activeId }) => {
    const asset = list.find(({ id }) => id === activeId)
    return { asset }
  }),
  withHandlers({
    keyChanged: ({ asset, updateAsset }) => key => value => {
      updateAsset({ id: asset.id, data: { [key]: value } })
    }
  })
)(EditAssetPage)

import React from 'react'
import { connect } from 'react-redux'
import { compose, onlyUpdateForKeys, withHandlers, withProps, withState } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'
import { Button, Card, FontIcon } from 'react-toolbox'

import AssetsPageHeader from './EditAssetPageHeader'
import { TextInput } from 'common'

import EditAssetInput from './EditAssetInput'

import './EditAssetPage.css'

const EditAssetPage = ({ keyChanged, asset, assetId }) => <div>
  <AssetsPageHeader/>
  <Card styleName="page-wrapper">
    <div styleName="header">
      <NavLink to="/assets">Asset</NavLink>
      <div styleName="dot"/>
      <Route path="/assets/edit/:assetId" component={() => <span>Update Asset</span>}/>
      <Route path="/assets/view/:assetId" component={() => <span>TODO: asset name in here</span>}/>
      <Route path="/assets/create" component={() => <span>Create Asset</span>}/>
    </div>
    <div styleName="edit-asset-page-content">
      <EditAssetInput/>
      <div style={{ paddingLeft: '32px' }}>
        <div styleName="asset-fields">
          <TextInput label="Asset Name" onChange={keyChanged('assetName')} value={asset.assetName || ''}/>
          <TextInput label="Serial Number" onChange={keyChanged('serialNumber')} value={asset.serialNumber || ''}/>
          <TextInput label="Asset Type" onChange={keyChanged('assetType')} value={asset.assetType || ''}/>
          <TextInput label="Legacy Asset Number" onChange={keyChanged('legacyNumber')} value={asset.legacyNumber || ''}/>
          <TextInput label="Model Name" onChange={keyChanged('modelName')} value={asset.modelName || ''}/>
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
  withState('asset', 'setAsset', {}),
  connect(({ user }) => ({ user })),
  withHandlers({
    keyChanged: ({ filter, setFilter }) => key => value => {
      filter[key] = value
      setFilter(filter)
    }
  })
)(EditAssetPage)

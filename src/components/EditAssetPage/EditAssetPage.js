import React from 'react'
import { compose, withHandlers } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'
import { Card } from 'react-toolbox'
import AssetsPageHeader from './EditAssetPageHeader'
import { TextInput } from 'common'
import EditAssetInput from './EditAssetInput'
import { inject, observer } from 'mobx-react'
import assets from 'mobx/Assets.store'

import './EditAssetPage.css'

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
          <TextInput label="Asset Number" onChange={keyChanged('asset_number')} value={asset.assetNumber || ''}/>
          <TextInput label="Model Name" onChange={keyChanged('model')} value={asset.model || ''}/>

          <TextInput label="Asset Name" onChange={keyChanged('asset_name')} value={asset.asset_name || ''}/>
          <TextInput label="Key Location" onChange={keyChanged('key_location')} value={asset.key_location || ''}/>

          <TextInput label="Legacy Asset Number" onChange={keyChanged('eq_number')} value={asset.eq_number || ''}/>
          <TextInput label="Serial Number" onChange={keyChanged('serialNumber')} value={asset.serialNumber || ''}/>

          <TextInput label="Asset Type" onChange={keyChanged('asset_type')} value={asset.asset_type || ''}/>
          <TextInput label="Manufacturer" onChange={keyChanged('manufacturer')} value={asset.manufacturer || ''}/>
        </div>
        <TextInput multiline label="Notes" onChange={keyChanged('notes')} value={asset.notes || ''}/>
      </div>
    </div>
  </Card>
</div>

export default compose(
  withRouter,
  inject(() => ({ asset: assets.active })),
  observer,
  withHandlers({
    keyChanged: ({ asset }) => key => value => asset[key] = value
  })
)(EditAssetPage)



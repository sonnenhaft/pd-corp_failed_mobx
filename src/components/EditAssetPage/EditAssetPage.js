import React from 'react'
import { connect } from 'react-redux'
import { compose, onlyUpdateForKeys, withHandlers, withProps, withState } from 'recompose'
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Card, FontIcon } from 'react-toolbox'

import AssetsPageHeader from './EditAssetPageHeader'
import { TextInput } from 'common'

import './EditAssetPage.css'

const EditAssetPage = ({ keyChanged, asset, assetId }) => <div>
  <AssetsPageHeader/>
  <Card styleName="page-wrapper">
    <div>
      {assetId && <div>
        Assets
        <FontIcon value="keyboard_arrow_right"/>
        ALARIS ETCO2 MODULES
      </div>}
      {!assetId && <div>
        Assets
        <FontIcon value="keyboard_arrow_right"/>
        Create asset
      </div>}
    </div>
    <div styleName="edit-asset-page-content">
      <div>
        <img src="http://lorempixel.com/283/365"/>
      </div>
      <div>
        <div styleName="asset-fields">
          <TextInput label="Asset Name" onChange={keyChanged('assetName')} value={asset.assetName || ''}/>
          <TextInput label="Serial Number" onChange={keyChanged('serialNumber')} value={asset.serialNumber || ''}/>
          <TextInput label="Asset Type" onChange={keyChanged('assetType')} value={asset.assetType || ''}/>
          <TextInput label="Legacy Asset Number" onChange={keyChanged('legacyNumber')} value={asset.legacyNumber || ''}/>
          <TextInput label="Model Name" onChange={keyChanged('modelName')} value={asset.modelName || ''}/>
          <TextInput label="Manufacturer" onChange={keyChanged('manufacturer')} value={asset.manufacturer || ''}/>
        </div>
        <TextInput label="Notes" onChange={keyChanged('notes')} value={asset.notes || ''}/>
        <div styleName="asset-fields">
          <div/>
          <div styleName="asset-fields">
            <NavLink to="/assets" replace exact style={{ color: 'white' }}>
              <Button raised>Cancel</Button>
            </NavLink>

            <Button raised>Save Asset</Button>
          </div>
        </div>
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

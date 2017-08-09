import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { NavLink, Route } from 'react-router-dom'
import { Card } from 'react-toolbox'
import AssetsPageHeader from './EditAssetPageHeader'
import { TextInput } from 'common'
import EditAssetInput from './EditAssetImageInput'
import { inject, observer } from 'mobx-react'

import './EditAssetPage.css'

const map = {
  assetNumber: 'Asset Number',
  model: 'Model Name',
  asset_name: 'Asset Name',
  key_location: 'Key Location',
  eq_number: 'Legacy Asset Number',
  serialNumber: 'Serial Number',
  asset_type: 'Asset Type',
  manufacturer: 'Manufacturer',
  notes: 'Notes'
}

const EditAssetPage = ({ Text, asset = {}, isView }) => {

  return <div>
    {/*without this line component is not updating*/}
    {/*<div style={{ display: 'none' }}>{Object.values(asset).join(',')}</div>*/}

    {/*{Object.values(asset).join(',')}*/}

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
        <EditAssetInput {...{ isView }}/>
        <div style={{ paddingLeft: '32px' }}>
          {isView && <div styleName="asset-number-header">
            ASSET NUMBER: {asset.assetNumber}
          </div>}
          {isView && <hr/>}
          <div styleName="asset-fields">
            {!isView && <Text value="assetNumber"/>}

            <Text value="model"/>
            <Text value="asset_name"/>
            <Text value="key_location"/>
            <Text value="eq_number"/>
            <Text value="serialNumber"/>
            <Text value="asset_type"/>
            <Text value="manufacturer"/>
          </div>
          {isView && <hr/>}
          <Text value="notes" multiline/>
        </div>
      </div>
    </Card>
  </div>
}

const Text = ({ assets, asset, isView, value, multiline }) => {
  return <TextInput
    multiline={multiline}
    disabled={isView}
    label={isView ? `${map[value]}:` : map[value]}
    onChange={val => assets.change(value, val)}
    value={asset[value] || ''}/>
}

export default compose(
  inject('routing', 'assets'),
  observer,
  withProps(({ assets, routing }) => {
    const isView = routing.location.pathname.indexOf('view') !== -1
    return {
      asset: isView ? assets.activeItem : assets.active,
      isView
    }
  }),
  withHandlers({
    // eslint-disable-next-line react/display-name
    Text: ({ asset, isView, assets }) => ({ value, multiline }) => {
      return <Text {...{ asset, assets, isView, value, multiline }}/>
    }
  })
)(EditAssetPage)

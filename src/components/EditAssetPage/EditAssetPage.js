import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { NavLink, Route } from 'react-router-dom'
import { Button, Card, FontIcon } from 'react-toolbox'
import AssetsPageHeader from './EditAssetPageHeader'
import { Dialog, TextInput } from 'common'
import EditAssetInput from './EditAssetImageInput'
import { inject, observer } from 'mobx-react'
import { assets, routing } from 'mobx-stores'

import './EditAssetPage.css'

const EditAssetPage = ({ Text, asset = {}, isView, assets, routing }) => {

  let saveAssetButton = <Button raised primary>
    <FontIcon value="save"/>
    Save Asset
  </Button>
  return <div>
    <AssetsPageHeader/>
    <Card styleName="page-wrapper">
      <div styleName="header">
        <NavLink to="/assets">Asset</NavLink>
        <div styleName="dot"/>
        <Route path="/assets/edit/:assetId" component={ () => <span>Update Asset</span> }/>
        <Route path="/assets/view/:assetId" component={ () => <span>{asset.name}</span> }/>
        <Route path="/assets/create" component={ () => <span>Create Asset</span> }/>
      </div>
      <div styleName="edit-asset-page-content">
        <EditAssetInput { ...{ isView } }/>
        <div style={ { paddingLeft: '32px' } }>
          {isView && <div styleName="asset-number-header">
            ASSET NAME: {asset.name}
          </div>}
          {isView && <hr/>}
          <div styleName="asset-fields">
            {assets.labels.filter(({ hidden, hideOnView, hideOnEdit, multiline }) => {
              return !hidden && (!isView || !hideOnView) && (isView || !hideOnEdit) && !multiline
            }).map(({ key }) => {
              return <Text value={ key } key={ key }/>
            })}
          </div>
          {isView && <hr/>}

          {assets.labels.filter(({ hidden, hideOnView, hideOnEdit, multiline }) => {
            return !hidden && (!isView || !hideOnView) && (isView || !hideOnEdit) && multiline
          }).map(({ key }) => {
            return <Text value={ key } key={ key } multiline/>
          })}

          {!isView && <div>
            <br/>
            <div styleName="bottom-buttons">
              <div styleName="greyed bottom-buttons">* Indicates required field</div>
              <div styleName="bottom-buttons left">
                <NavLink to="/assets">
                  <Button raised styleName="cancel-button">Cancel</Button>
                </NavLink>
                {asset.id ? <Dialog
                  okLabel="Yes" cancelLabel="No"
                  action={ () => assets.update().then(() => routing.push('/assets')) }
                  content={ () => <div>Are you sure you want to update this asset?</div> }>
                  {saveAssetButton}
                </Dialog> : <div onClick={ () => assets.add().then(() => routing.push('/assets')) }>
                  {saveAssetButton}
                </div>}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </Card>
  </div>
}

const labels = assets.getLabelsMap()
const Text = ({ assets, asset, isView, value, multiline }) => {
  let { required, label } = labels[value] || {}
  required = !isView && required
  label = isView ? `${ label }:` : `${ label }`
  return <TextInput
    disabled={ isView }
    value={ asset[value] || '' }
    { ...{ label, required, multiline } }
    onChange={ val => assets.change(value, val) }
    error={ (required && !asset[value]) ? `"${ label }" is required` : null }/>
}

export default compose(
  inject(() => ({
    assets,
    routing,
    activeItem: assets.activeItem,
    active: assets.active
  })),
  observer,
  withProps(({ assets, routing }) => {
    const isView = routing.location.pathname.includes('view')
    return {
      asset: isView ? assets.activeItem : assets.active,
      isView
    }
  }),
  withHandlers({
    // eslint-disable-next-line react/display-name
    Text: ({ asset, isView, assets }) => ({ value, multiline }) => {
      return <Text { ...{ asset, assets, isView, value, multiline } }/>
    }
  })
)(EditAssetPage)

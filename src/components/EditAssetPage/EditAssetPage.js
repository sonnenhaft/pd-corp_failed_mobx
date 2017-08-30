import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { NavLink, Route } from 'react-router-dom'
import { Button, Card, FontIcon } from 'react-toolbox'
import AssetsPageHeader from './EditAssetPageHeader'
import { Dialog, TextInput } from 'common'
import EditAssetImageInput from './EditAssetImageInput'
import { inject, observer } from 'mobx-react'
import { assets, routing } from 'mobx-stores'

import './EditAssetPage.css'

const EditAssetPage = ({ Text, asset = {}, isView, assets, save, touched, hasError }) => {

  let saveAssetButton = <Button raised primary disabled={hasError && touched}>
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
        <div>
          <EditAssetImageInput { ...{ isView } }/>
          {touched && !isView && (!asset.image && !assets.previewImage) && <span styleName="image-error">
            &quot;Image&quot; is required
          </span>}
        </div>

        <div style={ { paddingLeft: '32px' } }>
          {isView && <div styleName="asset-number-header">
            ASSET NAME: {asset.name}
          </div>}
          {isView && <hr/>}
          <div styleName="asset-fields">
            {assets.labels.filter(({ hidden, hideOnView, hideOnEdit, multiline }) => {
              return !hidden && (!isView || !hideOnView) && (isView || !hideOnEdit) && !multiline
            }).filter(label => {
              return asset.id || !label.hideOnCreate
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
                {(!hasError && asset.id) ? <Dialog
                  okLabel="Yes" cancelLabel="No"
                  action={ save }
                  content="Are you sure you want to update this asset?">
                  {saveAssetButton}
                </Dialog> : <div onClick={ save }>
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
const Text = ({ asset, isView, value, multiline, touched, change }) => {
  let { required, label } = labels[value] || {}
  required = !isView && required
  label = isView ? `${ label }:` : `${ label }`

  return <TextInput
    disabled={ isView }
    value={ asset[value] || '' }
    { ...{ label, required, multiline } }
    onChange={ val => change(value, val) }
    error={ (touched && required && !asset[value]) ? `"${ label }" is required` : null }/>
}

export default compose(
  inject(() => ({
    assets,
    routing,
    active: assets.active,
    activeItem: assets.activeItem
  })),
  observer,
  withProps(({ assets, routing }) => {
    const isView = routing.location.pathname.includes('view')
    return {
      asset: isView ? assets.activeItem : assets.active,
      isView,
      hasError: assets.labels.some(({ key, required }) => {
        return required && !assets.active[key]
      }) || (!assets.active.image && !assets.previewImage)
    }
  }),
  withState('touched', 'setTouched', false),
  withHandlers({
    change: ({ assets, asset }) => (key, val) => {
      assets.change(key, val)
    }
  }),
  withHandlers({
    // eslint-disable-next-line react/display-name
    Text: ({ asset, isView, value, multiline, touched, change }) => ({ value, multiline }) => {
      return <Text { ...{ asset, isView, value, multiline, touched, change } }/>
    },
    save: ({ asset, assets, setTouched, routing, hasError }) => () => {
      setTouched(true)
      if ( !hasError ) {
        (asset.id ? assets.update() : assets.add())
          .then(() => routing.push('/assets'))
      }
    }
  })
)(EditAssetPage)

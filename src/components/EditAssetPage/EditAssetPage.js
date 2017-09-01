import React from 'react'
import { compose, withHandlers, withProps, withPropsOnChange, withState } from 'recompose'
import { NavLink, Route } from 'react-router-dom'
import { Button, Card, FontIcon } from 'react-toolbox'
import AssetsPageHeader from './EditAssetPageHeader'
import { Dialog, TextInput } from 'common'
import EditAssetImageInput from './EditAssetImageInput'
import { inject, observer } from 'mobx-react'
import { assets, routing } from 'mobx-stores'
import cn from 'classnames'

import './EditAssetPage.css'

const EditAssetPage = ({ Text, asset = {}, isView, assets, save, touched, hasError, errors, setTouched }) => {

  let saveAssetButton = <Button raised primary disabled={ hasError && touched }>
    <FontIcon value="save"/>
    Save
  </Button>

  const barcodeError = touched && (!asset.barcode && !asset.number)
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
        <EditAssetImageInput { ...{ isView, setTouched } }/>

        <div style={ { paddingLeft: '32px' } }>
          {isView && <div styleName="asset-number-header">
            ASSET NAME: {asset.name}
          </div>}
          {isView && <hr/>}
          {!isView && <div styleName={ cn('paired-unique', { barcodeError }) }>
            <div styleName="header">
              Either
              <b> Barcode Number </b>
              or <b> Asset Number </b>
              required field. You can enter two of them.*
            </div>
            <div styleName="paired-fields">
              <Text value="number"/>
              <Text value="barcode"/>
            </div>
          </div>}
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
            {errors && errors.unknownError && <div styleName="custom-error">
              {errors.unknownError}
            </div>}
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
const Text = ({ asset, isView, value, multiline, touched, change, errors }) => {
  let { required, label } = labels[value] || {}
  label = isView ? `${ label }:` : `${ label }`

  const apiError = errors && errors[value]
  const pairValue = label.pairRequired ? asset[label.pairRequired] : true
  const requiredError = (required && !asset[value]) && `"${ label }" is required`
  const errorMsg = (touched && !isView && !pairValue) && (apiError || requiredError)
  return <TextInput
    disabled={ isView }
    value={ asset[value] || '' }
    { ...{ label, required: required && !label.pairRequired, multiline } }
    onChange={ val => change(value, val) }
    error={ errorMsg }/>
}

export default compose(
  inject(() => ({
    assets,
    routing,
    active: assets.active,
    activeItem: assets.activeItem,
    previewImage: assets.previewImage
  })),
  observer,
  withState('errors', 'setErrors', null),
  withProps(({ assets, routing, errors }) => {
    const isView = routing.location.pathname.includes('view')
    return {
      asset: isView ? assets.activeItem : assets.active,
      isView,
      hasError: assets.labels.some(({ key, required, pairRequired }) => {
        const pairValue = pairRequired ? assets.active[pairRequired] : true
        return required && !assets.active[key] && !pairValue
      }) || !!errors
    }
  }),
  withState('touched', 'setTouched', false),
  withPropsOnChange([], ({ assets, setErrors }) => ({
    change(key, val) {
      setErrors(null)
      assets.change(key, val)
    }
  })),
  withHandlers({
    // eslint-disable-next-line react/display-name
    Text: ({ asset, isView, touched, change, errors }) => ({ value, multiline }) => {
      return <Text { ...{ asset, isView, value, multiline, touched, change, errors } }/>
    },
    save: ({ asset, assets, setTouched, routing, hasError, setErrors }) => () => {
      setTouched(true)
      if ( !hasError ) {
        (asset.id ? assets.update() : assets.add())
          .then(() => routing.push('/assets'))
          .catch(e => {
            e = e.response.data
            const key = {
                RFID_ALREADY_USED: 'rfid',
                NUMBER_ALREADY_USED: 'name',
                BARCODE_ALREADY_USED: 'barcode'
              }[e.error] || e.field || 'unknownError'
            const errors = { [key]: e.msg || JSON.stringify(e) }
            console.error(errors)
            setErrors(errors)
          })
      }
    }
  })
)(EditAssetPage)

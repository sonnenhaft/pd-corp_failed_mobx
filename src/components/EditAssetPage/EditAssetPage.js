import React from 'react'
import { compose, withHandlers, withProps, withPropsOnChange, withState } from 'recompose'
import { NavLink, Route } from 'react-router-dom'
import { Button, Card, FontIcon } from 'react-toolbox'
import AssetsPageHeader from './EditAssetPageHeader'
import { Dialog, TextInput } from 'common'
import EditAssetImageInput from './EditAssetImageInput'
import { assets, mobxConnect, routing } from 'mobx-stores'
import cn from 'classnames'
import './EditAssetPage.css'

const EditAssetPage = ({ Text, asset = {}, isView, assets, save, touched, hasError, progress, errors, setTouched }) => {

  let saveAssetButton = <Button raised primary disabled={ progress || (hasError && touched) }>
    <FontIcon value="save"/>
    { progress ? 'Saving' : 'Save' }
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
              is a required field. You can enter both of them.*
            </div>
            <div styleName="paired-fields">
              <Text value="number"/>
              <Text value="barcode"/>
            </div>
          </div>}
          <div styleName="asset-fields">
            {assets.labels.filter(label => {
              if ( isView ) {
                return label.viewOrder
              } else {
                return label.editOrder && !label.pairRequired && (asset.id || !label.hideOnCreate)
              }
            }).sort((a, b) => {
              if ( isView ) {
                return a.viewOrder > b.viewOrder ? 1 : -1
              } else {
                return a.editOrder > b.editOrder ? 1 : -1
              }
            }).map(({ key, multiline }) => {
              return <Text value={ key } key={ key } multiline={ multiline }
                           styleName={ cn({ multiline }) }/>
            })}
          </div>
          {isView && <hr/>}

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

const labelsMap = assets.labelsMap
const Text = ({ asset, isView, isUpdate, value, multiline, touched, change, errors, className }) => {
  let { required, label, key, pairRequired, updateRequired } = labelsMap[value] || {}

  label = isView ? `${ label }:` : `${ label }`
  required = (required || (updateRequired && isUpdate) ) && !pairRequired

  let errorMsg = ''
  if ( errors && errors[key] ) {
    errorMsg = errors[key]
  } else if ( touched && !isView && required && !asset[key] ) {
    errorMsg = `"${ label }" is required`
  }

  return <TextInput
    className={ className }
    disabled={ isView }
    value={ asset[key] || '' }
    { ...{ label, required, multiline } }
    onChange={ value => change(key, value) }
    error={ errorMsg }/>
}

export default compose(
  mobxConnect(() => ({
    assets,
    routing,
    active: assets.active,
    editableActiveAsset: assets.editableActiveAsset,
    previewImage: assets.previewImage
  })),
  withState('errors', 'setErrors', null),
  withPropsOnChange(['assets', 'routing', 'errors', 'active'], ({ assets, routing, errors }) => {
    const isView = routing.location.pathname.includes('view')
    const isUpdate = routing.location.pathname.includes('edit')
    return {
      asset: isView ? assets.editableActiveAsset : assets.active,
      isView,
      isUpdate,
      hasError: assets.labels.some(({ key, required, pairRequired, updateRequired }) => {
        let val = assets.active[key]
        required = required || (updateRequired && isUpdate)
        if ( pairRequired ) {
          val = val || assets.active[pairRequired]
        }
        return required && !val
      }) || !!errors
    }
  }),
  withState('touched', 'setTouched', false),
  withState('progress', 'setProgress', false),
  withProps(({ assets, setErrors }) => ({
    change(fieldName, value) {
      setErrors(null)
      assets.changeAndCutActiveAssetField(fieldName, value)
    }
  })),
  withHandlers({
    // eslint-disable-next-line react/display-name
    Text: ({ asset, isView, isUpdate, touched, change, errors }) => ({ value, multiline, className }) => {
      return <Text { ...{ asset, isView, isUpdate, value, multiline, touched, change, errors, className } }/>
    },
    save: ({ asset, assets, setTouched, routing, hasError, setErrors, setProgress }) => async() => {
      setTouched(true)
      if ( hasError ) {
        return
      }
      setProgress(true)
      try {
        await (asset.id ? assets.update() : assets.add())
        routing.push('/assets')
      } catch (e) {
        setProgress(false)
        const { data } = e.response
        const fieldName = {
            RFID_ALREADY_USED: 'rfid',
            NUMBER_ALREADY_USED: 'name',
            BARCODE_ALREADY_USED: 'barcode'
          }[data.error] || data.field || 'unknownError'

        setErrors({ [fieldName]: data.msg || JSON.stringify(data) })
      }
    }
  })
)(EditAssetPage)

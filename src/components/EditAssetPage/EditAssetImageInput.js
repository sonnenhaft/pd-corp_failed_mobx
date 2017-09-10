import React from 'react'
import cn from 'classnames'
import { compose, withProps, withState } from 'recompose'
import { FontIcon, IconButton } from 'react-toolbox'
import './EditAssetImageInput.css'
import { assets, mobxConnect, notifications } from 'mobx-stores'
import { FileInputButton } from 'common'

const MEGABYTE = 1024 * 1024
const MAX_FILE_SIZE = 5 * MEGABYTE

const EditAssetInputRef = props => {
  const { isView, setMaxSizeError, previewImage, onFileUploaded } = props

  return <FileInputButton
    styleName={ cn('input-wrapper', { isView }) }
    accept="image/png,image/jpg,image/jpeg,image/bmp"
    maxSize={ MAX_FILE_SIZE }
    disabled={ isView }
    { ...{ setMaxSizeError, onFileUploaded } }>
    {!previewImage && <div>
      <div style={ { textAlign: 'center' } }>
        <div>Upload image</div>
        <i>Click to search</i>
        <div><FontIcon value="library_add"/></div>
      </div>
    </div>}
    {previewImage && <div>
      <img src={ previewImage }/>
      <div styleName="buttons">
        <div styleName="background"/>
        <IconButton icon="mode_edit" primary/>
        <IconButton icon="delete" accent onClick={ e => {
          assets.previewImage = null
          e.stopPropagation()
        } }/>
      </div>
    </div>}
  </FileInputButton>
}

export default compose(
  withState('error', 'setError', null),
  withProps({
    setMaxSizeError(file) {
      const megabytes = Math.round(file.size / MEGABYTE * 10) / 10
      notifications.error(`The file upload has failed.
        The file size exceeds the allowable limit of 5 MB. (now is ${ megabytes }mb)`, 5000)
    }
  }),
  withProps({
    onFileUploaded(file) {
      const fileReader = new FileReader()
      fileReader.onload = e => assets.previewImage = e.target.result
      fileReader.readAsDataURL(file)
    }
  }),
  mobxConnect(() => ({
    assets,
    active: assets.active,
    previewImage: assets.previewImage
  }))
)(EditAssetInputRef)

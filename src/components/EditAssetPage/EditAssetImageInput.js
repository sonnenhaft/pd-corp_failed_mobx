import React from 'react'
import cn from 'classnames'
import { compose, withHandlers, withState } from 'recompose'
import { FontIcon, IconButton } from 'react-toolbox'
import './EditAssetImageInput.css'
import { assets, mobxConnect } from 'mobx-stores'

const EditAssetInputRef = props => {
  const { proxyClick, onFilesSelected, setInputRef, isView, assets } = props
  const setPreviewImage = t => assets.setPreviewImage(t)
  const previewImage = assets.previewImage
  return <div
    styleName={ cn('input-wrapper', { isView }) }
    onClick={ proxyClick }>
    <input ref={ setInputRef } type="file" accept="image/*"
           onChange={ onFilesSelected } style={ { display: 'none' } }/>
    {!previewImage && <div>
      <div style={ { textAlign: 'center' } }>
        <div>Upload photo</div>
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
          setPreviewImage(null)
          e.stopPropagation()
        } }/>
      </div>
    </div>}
  </div>
}

const setPreviewImageFromFile = (file, setPreviewImage) => {
  const fileReader = new FileReader()
  fileReader.onload = e => setPreviewImage(e.target.result)
  fileReader.readAsDataURL(file)
}

export default compose(
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    proxyClick: ({ inputRef, isView }) => () => !isView && inputRef.click(),
    onFilesSelected: () => ({ target }) => {
      setPreviewImageFromFile(target.files[0], item => {
        assets.setPreviewImage(item)
      })
      target.value = null
    }
  }),
  mobxConnect('assets')
)(EditAssetInputRef)

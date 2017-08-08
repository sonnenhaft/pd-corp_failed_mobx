import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { FontIcon, IconButton } from 'react-toolbox'
import './EditAssetInput.css'

const EditAssetInputRef = ({ proxyClick, onFilesSelected, setInputRef, previewImage, setPreviewImage }) => <div
  styleName="input-wrapper" onClick={proxyClick}>
  <input ref={setInputRef} type="file" accept="image/*"
         onChange={onFilesSelected} style={{ display: 'none' }}/>
  {!previewImage && <div>
    <div style={{ textAlign: 'center' }}>
      <div>Upload photo</div>
      <i>Click to search</i>
      <div><FontIcon value="library_add"/></div>
    </div>
  </div>}
  {previewImage && <div>
    <img src={previewImage}/>
    <div styleName="buttons">
      <div styleName="background"/>
      <IconButton icon="mode_edit" primary/>
      <IconButton icon="delete" accent onClick={e => {
        setPreviewImage(null)
        e.stopPropagation()
      }}/>
    </div>
  </div>}
</div>

const setPreviewImageFromFile = (file, setPreviewImage) => {
  const fileReader = new FileReader()
  fileReader.onload = e => setPreviewImage(e.target.result)
  fileReader.readAsDataURL(file)
}

export default compose(
  withState('inputRef', 'setInputRef', null),
  withState('previewImage', 'setPreviewImage', null),
  withHandlers({
    proxyClick: ({ inputRef }) => () => inputRef.click(),
    onFilesSelected: ({ setPreviewImage }) => ({ target }) => {
      setPreviewImageFromFile(target.files[0], setPreviewImage)
      target.value = null
    }
  })
)(EditAssetInputRef)

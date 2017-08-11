import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { FontIcon, IconButton } from 'react-toolbox'
import './EditAssetImageInput.css'

const EditAssetInputRef = ({ proxyClick, onFilesSelected, setInputRef, previewImage, setPreviewImage, isView }) => <div
  styleName={`input-wrapper ${isView ? 'is-view' : ''}`} onClick={proxyClick}>
  <input ref={setInputRef} type="file"
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
    proxyClick: ({ inputRef, isView }) => () => !isView && inputRef.click(),
    onFilesSelected: ({ setPreviewImage }) => ({ target }) => {
      const reader = new FileReader()

      reader.onload = function (e) {
        const data = e.target.result
        console.log(data)
        const workbook = window.XLS.read(data, { type: 'binary' })
        console.log(window.XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1))
      }
      reader.readAsBinaryString(target.files[0])
    }
  })
)(EditAssetInputRef)

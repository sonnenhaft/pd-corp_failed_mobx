import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { FontIcon, IconButton } from 'react-toolbox'
import './XlsUploadInput.css'

const XlsUploadInput = ({ proxyClick, onFilesSelected, setInputRef, previewImage, setPreviewImage, isView, sheetData }) => <div>
  <button onClick={proxyClick}>
    <input ref={setInputRef} type="file"
           onChange={onFilesSelected} style={{ display: 'none' }}/>
    Test XLS/XLSX/CSV file upload
  </button>

  {sheetData && <div>
    <b>First 300 symbols as Array</b>
    <div>{JSON.stringify(sheetData).slice(0, 300)}...</div>
  </div>}

</div>

export default compose(
  withState('inputRef', 'setInputRef', null),
  withState('previewImage', 'setPreviewImage', null),
  withState('sheetData', 'setSheetData', null),
  withHandlers({
    proxyClick: ({ inputRef, isView }) => () => !isView && inputRef.click(),
    onFilesSelected: ({ setPreviewImage, setSheetData }) => ({ target }) => {
      const reader = new FileReader()

      reader.onload = function (e) {
        const data = e.target.result
        const workbook = window.XLS.read(data, { type: 'binary' })
        const sheetData = window.XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        setSheetData(sheetData)
      }

      reader.readAsBinaryString(target.files[0])
    }
  })
)(XlsUploadInput)

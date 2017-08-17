import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Button } from 'react-toolbox'
import './XlsUploadInput.css'
import assets from 'mobx/Assets.store'

const XlsUploadInput = ({ proxyClick, onFilesSelected, setInputRef, setTestData }) => <div>
  <Button raised onClick={proxyClick}>
    <input ref={setInputRef} type="file"
           onChange={onFilesSelected} style={{ display: 'none' }}/>
    Test XLS/XLSX/CSV file upload
  </Button>
  &nbsp;
  &nbsp;
  <Button raised onClick={setTestData}>
    IE temp test
  </Button>
</div>

export default compose(
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    proxyClick: ({ inputRef, isView }) => () => !isView && inputRef.click(),
    setTestData: () => () => assets.setSheetToImport([{
      ' Acquisition Date ': '7/21/09',
      ' Category ': 'MONITORS: BEDSIDE: RESP: EXHALED CO2'
    }]),
    onFilesSelected: () => ({ target }) => {
      const reader = new FileReader()

      reader.onload = function(e) {
        let data = e.target.result
        const workbook = window.XLSX.read(data, { type: 'binary' })
        assets.setSheetToImport(window.XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
      }

      reader.readAsBinaryString(target.files[0])
    }
  })
)(XlsUploadInput)

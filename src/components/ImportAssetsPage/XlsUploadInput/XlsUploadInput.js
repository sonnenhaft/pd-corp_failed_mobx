import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Button } from 'react-toolbox'
import './XlsUploadInput.css'
import assets from 'mobx/Assets.store'
import { withRouter } from 'react-router-dom'

// ie10-11 polyfill
if (!FileReader.prototype.readAsBinaryString) {
  FileReader.prototype.readAsBinaryString = function(blob) {
    const reader = new FileReader()
    reader.onload = () => {
      let binaryString = ''
      const bytes = new Uint8Array(reader.result)
      const length = bytes.byteLength
      for (let i = 0; i < length; i++) {
        binaryString += String.fromCharCode(bytes[i])
      }
      this.onload({ target: { result: binaryString } })
    }
    reader.readAsArrayBuffer(blob)
  }
}

const XlsUploadInput = props => {
  const { proxyClick, onFilesSelected, setInputRef, children, className } = props
  return <Button raised onClick={ proxyClick } { ...{ className } }>
    <input ref={ setInputRef } type="file"
           onChange={ onFilesSelected } style={ { display: 'none' } }/>
    {children}
  </Button>
}

export default compose(
  withRouter,
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    proxyClick: ({ inputRef }) => () => inputRef.click(),
    onFilesSelected: ({ history }) => ({ target }) => {
      const reader = new FileReader()
      reader.onload = e => {
        let data = e.target.result
        if ( target.files[0].name.endsWith('.csv') ) {
          if ( data.split(';').length > data.split(',').length ) {
            console.warn('Converting semicolon separated CSV to comma separated csv.')
            data = data.replace(/;/g, ',')
          }
        }
        const workbook = window.XLSX.read(data, { type: 'binary' })
        const sheetData = workbook.Sheets[workbook.SheetNames[0]]
        assets.setSheetToImport(window.XLSX.utils.sheet_to_json(sheetData))
        history.push('/assets/import')
      }

      reader.readAsBinaryString(target.files[0])
    }
  })
)(XlsUploadInput)

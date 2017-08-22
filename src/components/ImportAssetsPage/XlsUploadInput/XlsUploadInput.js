import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Button } from 'react-toolbox'
import './XlsUploadInput.css'
import { assets, routing } from 'mobx-stores'

// ie10-11 polyfill
if ( !FileReader.prototype.readAsBinaryString ) {
  FileReader.prototype.readAsBinaryString = function(blob) {
    const reader = new FileReader()
    reader.onload = () => {
      let result = ''
      const bytes = new Uint8Array(reader.result)
      const stringLen = bytes.byteLength
      for (let charIdx = 0; charIdx < stringLen; charIdx++) {
        result += String.fromCharCode(bytes[charIdx])
      }
      this.onload({ target: { result } })
    }
    reader.readAsArrayBuffer(blob)
  }
}

const XlsUploadInput = props => {
  const { proxyClick, onFilesSelected, setInputRef, children, className } = props
  return <Button raised onClick={ proxyClick } className={ className }>
    <input ref={ setInputRef } type="file"
           onChange={ onFilesSelected } style={ { display: 'none' } }/>
    {children}
  </Button>
}

export default compose(
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    proxyClick: ({ inputRef }) => () => inputRef.click(),
    onFilesSelected: () => ({ target }) => {
      const reader = new FileReader()
      reader.onload = e => {
        let data = e.target.result
        if ( target.files[0].name.endsWith('.csv') ) {
          if ( data.split(';').length > data.split(',').length ) {
            console.warn('Converting semicolon separated CSV to comma separated csv.')
            data = data.replace(/;/g, ',')
          }
        }

        import(/* webpackChunkName: "xlsx" */ 'xlsx').then(XLSX => {
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetData = workbook.Sheets[workbook.SheetNames[0]]
          assets.setSheetToImport(XLSX.utils.sheet_to_json(sheetData))
          routing.push('/assets/import')
        })
      }

      reader.readAsBinaryString(target.files[0])
    }
  })
)(XlsUploadInput)

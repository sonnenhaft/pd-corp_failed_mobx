import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Button } from 'react-toolbox'
import './XlsUploadInput.css'
import assets from 'mobx/Assets.store'
import { withRouter } from 'react-router-dom'

const isIE = () => {
  const isIE11 = !!window.MSInputMethodContext && !!window.document.documentMode
  const isIE10 = window.navigator.userAgent.toString().toLowerCase().indexOf('trident/6') > -1
  return isIE11 || isIE10
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
    proxyClick: ({ inputRef, history }) => () => {
      if ( isIE() ) {
        const allowNext = window.confirm('Table upload feature is not working in IE yet. Press ok to go with stub data.')
        if ( allowNext ) {
          assets.setSheetToImport([{
            ' TODO(vlad) remove IE stub data: ': '7/21/09',
            ' Add hook for IE ': 'MONITORS: BEDSIDE: RESP: EXHALED CO2'
          }])
          history.push('/assets/import')
        }
      } else {
        inputRef.click()
      }

    },
    onFilesSelected: ({ history }) => ({ target }) => {
      const reader = new FileReader()

      reader.onload = e => {
        const data = e.target.result
        const workbook = window.XLSX.read(data, { type: 'binary' })
        console.log(workbook)
        const sheetData = workbook.Sheets[workbook.SheetNames[0]]
        assets.setSheetToImport(window.XLSX.utils.sheet_to_json(sheetData))
        history.push('/assets/import')
      }

      reader.readAsBinaryString(target.files[0])
    }
  })
)(XlsUploadInput)

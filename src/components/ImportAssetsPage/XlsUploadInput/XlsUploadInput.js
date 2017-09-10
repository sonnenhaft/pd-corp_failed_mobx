import React from 'react'
import { compose, withProps } from 'recompose'
import { assets, notifications, routing } from 'mobx-stores'
import { FileInputButton } from 'common'

const MEGABYTE = 1024 * 1024
const MAX_FILE_SIZE = 5 * MEGABYTE

export default compose(
  withProps(() => ({
    accept: '.csv,.xls,.xlsx',
    maxSize: MAX_FILE_SIZE,
    setMaxSizeError: file => {
      const megabytes = Math.round(file.size / MEGABYTE * 10) / 10
      notifications.error(`The file upload has failed. 
        The file size exceeds the allowable limit of 5 MB. (now is ${ megabytes }mb)`, 5000)
    },
    onFileUploaded: file => {
      async function onReadAsBinaryString(e) {
        let data = e.target.result
        if ( file.name.endsWith('.csv') && data.split(';').length > data.split(',').length ) {
          console.warn('Converting semicolon separated CSV to comma separated csv.')
          data = data.replace(/;/g, ',')
        }

        const [XLSX] = await  Promise.all([
          import(/* webpackChunkName: "xlsx" */ 'xlsx'),
          import(/* webpackChunkName: "FileReader.readAsBinaryString.polyfill" */ './FileReader.readAsBinaryString.polyfill')
        ])

        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetData = workbook.Sheets[workbook.SheetNames[0]]

        assets.xlsTable = XLSX.utils.sheet_to_json(sheetData)
        routing.push('/assets/import')
      }

      const reader = new FileReader()
      reader.onload = onReadAsBinaryString
      reader.readAsBinaryString(file)
    }
  }))
)(props => {
  return <FileInputButton { ...props }/>
})

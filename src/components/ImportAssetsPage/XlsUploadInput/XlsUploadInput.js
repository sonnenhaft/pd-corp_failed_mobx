import { compose, withProps } from 'recompose'
import { assets, notifications, routing } from 'mobx-stores'
import { FileInputButton } from './FileInputButton'
import './FileReader.readAsBinaryString.polyfill'

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
      const reader = new FileReader()
      reader.onload = e => {
        let data = e.target.result
        if ( file.name.endsWith('.csv') && data.split(';').length > data.split(',').length ) {
          console.warn('Converting semicolon separated CSV to comma separated csv.')
          data = data.replace(/;/g, ',')
        }

        import(/* webpackChunkName: "xlsx" */ 'xlsx').then(XLSX => {
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetData = workbook.Sheets[workbook.SheetNames[0]]
          assets.setSheetToImport(XLSX.utils.sheet_to_json(sheetData))
          routing.push('/assets/import')
        })
      }
      reader.readAsBinaryString(file)
    }
  }))
)(FileInputButton)

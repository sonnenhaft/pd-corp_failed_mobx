const name = 'name'
const number = 'number'
const type = 'type'
const department = 'department'
const manufacturer = 'manufacturer'
const description = 'description'
const searchTerms = 'searchTerms'
const rfidAssigned = 'rfidAssigned'
const serial = 'serial'
const barcode = 'barcode'
const rfid = 'rfid'
const note = 'note'
const lastUsedDate = 'updateLocationDate'
const image = 'image'
const model = 'model'
const keyLocation = 'keyLocation'

const orders = {
  importOrder: [number, barcode, name, model, image,
    manufacturer, type, description, department, serial, note],
  viewOrder: [number, barcode, type, searchTerms,
    department, rfidAssigned, keyLocation, serial, model,
    rfid, manufacturer, lastUsedDate, description, note],
  editOrder: [number, barcode, name, manufacturer, type, description,
    department, serial, keyLocation, rfid, model, lastUsedDate, note],
  searchOrder: [type, manufacturer, rfidAssigned,
    keyLocation, department, lastUsedDate, model]
}

export default [
  { label: 'id', key: 'id', hidden: true },
  { label: 'Asset Name', key: name, required: true, alwaysInTable: true },
  { label: 'Asset Number', key: number, required: true, alwaysInTable: true, pairRequired: barcode },
  { label: 'Asset Type', key: type, required: true },
  { label: 'Owner/Department', key: department },
  { label: 'Location', key: keyLocation, hideOnCreate: true },
  { label: 'Model', key: model },
  { label: 'Manufacturer', key: manufacturer },
  { label: 'Description', key: description },
  { label: 'Search Terms', key: searchTerms },
  { label: 'RFID Assigned', key: rfidAssigned },
  { label: 'Serial Number', key: serial },
  { label: 'Barcode Number', key: barcode, required: true, pairRequired: number },
  { label: 'RFID Number', key: rfid, hideOnCreate: true },
  {
    label: 'Update Location Date',
    key: lastUsedDate,
    dateFilterKeys: [
      { key: 'fromUpdateLocationDate', label: 'Update Location Date From' },
      { key: 'toUpdateLocationDate', label: 'Update Location Date To' }
    ]
  },
  { label: 'Asset Image', key: image, hidden: true },
  { label: 'Notes', key: note, multiline: true }
].map(label => Object.keys(orders).reduce((label, key) => {
  label[key] = orders[key].indexOf(label.key) + 1 || undefined
  return label
}, label))

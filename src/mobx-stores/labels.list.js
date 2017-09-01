const name = 'name'
const number = 'number'
const type = 'type'
const department = 'department'
const manufacture = 'manufacture'
const description = 'description'
const searchTerms = 'searchTerms'
const rfidAssigned = 'rfidAssigned'
const serial = 'serial'
const barcode = 'barcode'
const rfid = 'rfid'
const note = 'note'
const lastUsedDate = 'lastUsedDate'
const image = 'image'
const model = 'model'
const keyLocation = 'keyLocation'

const importOrder = [number, barcode, name, model, image, type, manufacture, description, department, serial, note]
const viewOrder = [number, barcode, type, searchTerms, department, rfidAssigned, keyLocation, serial, model, rfid, manufacture, lastUsedDate, description, note]
const editOrder = [number, barcode, type, name, manufacture, description, department, serial, keyLocation, rfid, model, lastUsedDate, note]
const searchOrder = [keyLocation, department, type, manufacture, rfidAssigned, lastUsedDate, model]

export default [
  { label: 'id', key: 'id', hidden: true },
  { label: 'Asset Name', key: name, required: true, hideOnView: true, alwaysInTable: true },
  { label: 'Asset Number', key: number, required: true, alwaysInTable: true, hideOnEdit: true, pairRequired: barcode },
  { label: 'Asset Type', key: type, required: true, searchOrder: 1 },
  { label: 'Owner/Department', key: department, searchOrder: 5 },
  { label: 'Location', key: keyLocation, searchOrder: 4 },
  { label: 'Model', key: model, searchOrder: 7 },
  { label: 'Manufacturer', key: manufacture, searchOrder: 2 },
  { label: 'Description', key: description },
  { label: 'Search Terms', key: searchTerms, hideOnEdit: true },
  { label: 'RFID Assigned', key: rfidAssigned, searchOrder: 3, hideOnEdit: true },
  { label: 'Serial Number', key: serial },
  { label: 'Barcode Number', key: barcode, hideOnEdit: true, required: true, pairRequired: number },
  { label: 'RFID Number', key: rfid, hideOnCreate: true },
  {
    label: 'Update Location Date',
    key: lastUsedDate,
    searchOrder: 6,
    hideOnEdit: true,
    dateFilterKeys: [
      { key: 'fromUpdateLocationDate', label: 'Update Location Date From' },
      { key: 'toUpdateLocationDate', label: 'Update Location Date To' }
    ]
  },
  { label: 'Asset Image', key: image, hidden: true },
  { label: 'Notes', key: note, multiline: true }
].map(obj => {
  const _importOrder = importOrder.indexOf(obj.key) + 1 || undefined
  const _viewOrder = viewOrder.indexOf(obj.key) + 1 || undefined
  const _editOrder = editOrder.indexOf(obj.key) + 1 || undefined
  const _searchOrder = searchOrder.indexOf(obj.key) + 1 || undefined
  return Object.assign(obj, {
    importOrder: _importOrder,
    viewOrder: _viewOrder,
    editOrder: _editOrder,
    searchOrder: _searchOrder
  })
})

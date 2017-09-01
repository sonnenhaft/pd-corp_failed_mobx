/**
 Current java mapping for this fields:
 @Length(max = 50) @NotBlank private String name;
 @Length(max = 50) @NotBlank private String type;
 @Length(max = 50) private String barcode;
 @Length(max = 50) private String number;
 @Length(max = 50) private String serial;
 @Length(max = 1000) private String note;
 @Length(max = 1000) private String description;
 @Length(max = 50) private String department;
 @Length(max = 50) private String manufacture;
 @Length(max = 50) private String model;
 @Length(max = 50) private String rfid;
 private LocalDateTime lastUsedDate;
 @Valid private KeyLocationDto keyLocation;
 private ImageDto image;
 */

const hideOnEdit = true
const alwaysInTable = true
const hideOnView = true
const required = true

export default [
  { label: 'id', key: 'id', hidden: true },
  { label: 'Asset Name', key: 'name', required, hideOnView, alwaysInTable, editOrder: 1, importOrder: 1 },
  { label: 'Asset Number', key: 'number', required, alwaysInTable, hideOnEdit, pairRequired: 'barcode', editOrder: -1, importOrder: -1, viewOrder: 1 },
  { label: 'Asset Type', key: 'type', required, searchOrder: 1, editOrder: 3, importOrder: 6, viewOrder: 3 },
  { label: 'Owner/Department', key: 'department', searchOrder: 5, editOrder: 5, importOrder: 8, viewOrder: 5 },
  { label: 'Location', key: 'keyLocation', searchOrder: 4, hideOnCreate: true, editOrder: 7, viewOrder: 7 },
  { label: 'Model', key: 'model', searchOrder: 7, editOrder: 9, importOrder: 2, viewOrder: 9 },
  { label: 'Manufacturer', key: 'manufacture', searchOrder: 2, editOrder: 2, importOrder: 5, viewOrder: 11 },
  { label: 'Description', key: 'description', editOrder: 4,  importOrder: 7, viewOrder: 12},
  { label: 'Search Terms', key: 'searchTerms', hideOnEdit, viewOrder: 4 },
  { label: 'RFID Assigned', key: 'rfidAssigned', searchOrder: 3, hideOnEdit, viewOrder: 6 },
  { label: 'Serial Number', key: 'serial', editOrder: 6, importOrder: 9, viewOrder: 8 },
  { label: 'Barcode Number', key: 'barcode', hideOnEdit, required, pairRequired: 'number', editOrder: 0, importOrder: 0, viewOrder: 2 },
  { label: 'RFID Number', key: 'rfid', editOrder: 8, hideOnCreate: true, viewOrder: 10 },
  {
    label: 'Update Location Date',
    key: 'lastUsedDate',
    searchOrder: 6,
    editOrder: 10,
    viewOrder: 11,
    hideOnEdit,
    dateFilterKeys: [
      { key: 'fromUpdateLocationDate', label: 'Update Location Date From' },
      { key: 'toUpdateLocationDate', label: 'Update Location Date To' }
    ]
  },
  { label: 'Asset Image', key: 'image', hidden: true, importOrder: 4 },
  { label: 'Notes', key: 'note', multiline: true, editOrder: 11, importOrder: 10,viewOrder: 13 }
]

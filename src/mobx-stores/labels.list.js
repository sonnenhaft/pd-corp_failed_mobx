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
  { label: 'Asset Name', key: 'name', required, hideOnView, alwaysInTable, viewOrder: 1 },
  { label: 'Asset Number', key: 'number', required, alwaysInTable, hideOnEdit, pairRequired: 'barcode', viewOrder: -1 },
  { label: 'Asset Type', key: 'type', required, searchOrder: 1, viewOrder: 3 },
  { label: 'Owner/Department', key: 'department', searchOrder: 5, viewOrder: 5 },
  { label: 'Location', key: 'keyLocation', searchOrder: 4, hideOnCreate: true, viewOrder: 7 },
  { label: 'Model', key: 'model', searchOrder: 7, viewOrder: 9 },
  { label: 'Manufacturer', key: 'manufacture', searchOrder: 2, viewOrder: 2 },
  { label: 'Description', key: 'description', viewOrder: 4 },
  { label: 'Search Terms', key: 'searchTerms', hideOnEdit },
  { label: 'RFID Assigned', key: 'rfidAssigned', searchOrder: 3, hideOnEdit },
  { label: 'Serial Number', key: 'serial', viewOrder: 6 },
  { label: 'Barcode Number', key: 'barcode', hideOnEdit, required, pairRequired: 'number', viewOrder: 0 },
  { label: 'RFID Number', key: 'rfid', viewOrder: 8, hideOnCreate: true },
  {
    label: 'Update Location Date',
    key: 'lastUsedDate',
    searchOrder: 6,
    viewOrder: 10,
    hideOnEdit,
    dateFilterKeys: [
      { key: 'fromUpdateLocationDate', label: 'Update Location Date From' },
      { key: 'toUpdateLocationDate', label: 'Update Location Date To' }
    ]
  },
  { label: 'Image', key: 'image', hidden: true },
  { label: 'Notes', key: 'note', multiline: true, viewOrder: 11 }
]

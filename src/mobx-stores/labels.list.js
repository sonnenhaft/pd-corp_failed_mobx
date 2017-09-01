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

export default [
  { label: 'id', key: 'id', hidden: true },
  { label: 'Asset Name', key: 'name', required: true, hideOnView: true, alwaysInTable: true },
  { label: 'Asset Number', key: 'number', required: true, alwaysInTable: true, hideOnEdit: true, pairRequired: 'barcode' },
  { label: 'Asset Type', key: 'type', required: true, searchOrder: 1 },
  { label: 'Owner/Department', key: 'department', searchOrder: 5 },
  { label: 'Location', key: 'keyLocation', searchOrder: 4, hideOnCreate: true },
  { label: 'Model', key: 'model', searchOrder: 7 },
  { label: 'Manufacturer', key: 'manufacture', searchOrder: 2 },
  { label: 'Description', key: 'description' },
  { label: 'Search Terms', key: 'searchTerms' },
  { label: 'RFID Assigned', key: 'rfidAssigned', searchOrder: 3 },
  { label: 'Serial Number', key: 'serial' },
  { label: 'Barcode Number', key: 'barcode', hideOnEdit: true, required: true, pairRequired: 'number' },
  { label: 'RFID Number', key: 'rfid' },
  {
    label: 'Update Location Date', key: 'lastUsedDate', hideOnEdit: true, searchOrder: 6,
    hideOnCreate: true,
    dateFilterKeys: [
    { key: 'fromUpdateLocationDate', label: 'Last Update Date from' },
    { key: 'toUpdateLocationDate', label: 'Last Update Date to' }
  ]
  },
  { label: 'Image', key: 'image', hidden: true },
  { label: 'Notes', key: 'note', multiline: true }
]

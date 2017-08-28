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
  { label: 'Asset Name', key: 'name', required: true, hideOnView: true },
  { label: 'Asset Number', key: 'number', required: true },
  { label: 'Asset Type', key: 'type', required: true, defaultVisible: true, searchOrder: 1 },
  { label: 'Owner/Department', key: 'department', defaultVisible: true, searchOrder: 5 },
  { label: 'Location', key: 'keyLocation', defaultVisible: true, searchOrder: 2 },
  { label: 'Model', key: 'model', searchOrder: 3 },
  { label: 'Manufacturer', key: 'manufacturer', searchOrder: 4 },
  { label: 'Description', key: 'description' },
  { label: 'Search Terms', key: 'search_terms' },
  { label: 'RFID Assigned', key: 'rfidAssigned', searchOrder: 6 },
  { label: 'Serial Number', key: 'serial' },
  { label: 'Barcode Number', key: 'barcode', required: true },
  { label: 'RFID Number', key: 'rfid' },
  { label: 'Notes', key: 'note', multiline: true },
  { label: 'Image', key: 'image', hidden: true },
  {
    label: 'Update Location Date', key: 'lastUsedDate', hideOnEdit: true, searchOrder: 7, dateFilterKeys: [
    { key: 'fromUpdateLocationDate', label: 'Last Update Date from' },
    { key: 'toUpdateLocationDate', label: 'Last Update Date to' }
  ]
  }
]

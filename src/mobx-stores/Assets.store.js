import { observable } from 'mobx'
import { axios, generateLine, toFormData } from 'common'
import { create as hydrate, persist } from 'mobx-persist'

// const delay = () => new Promise(resolve => setTimeout(resolve, 1000))

class AssetsStore {
  @persist('list') @observable list = []
  @persist @observable totalPages = 1
  @persist @observable totalElements = 1

  @persist('object') @observable searchParams = {}
  @persist('object') @observable paging = { page: 0 }

  @persist @observable activeId = null
  @persist('object') @observable active = {}
  @persist('object') @observable activeItem = {}

  /** @example [{' stub field 1: ': 'some val 1'}] */
  @persist('list') @observable xlsTable = []
  @observable tableLoading = false
  @persist('object') @observable sort = {key: 'name',  asc: true}
  @persist('object') @observable activeColumns = {
    type: true,
    owner: true,
    location: true
  }

  search() {
    this.paging.page = 0
    return this.loadList()
  }

  setPage(item) {
    this.paging.page = item
    return this.loadList()
  }

  getVisibleLabels() {
    return this.labels.filter(({ key }) => this.activeColumns[key])
  }

  getLabelsMap() {
    return this.labels.reduce(((map, item) => {
      map[item.key] = item
      return map
    }), {})
  }

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

  labels = [
    { label: 'id', key: 'id', hidden: true },
    { label: 'Asset Name', key: 'name', required: true, hideOnView: true, searchOrder: 'с' },
    { label: 'Asset Number', key: 'number', required: true, searchOrder: 'a' },
    { label: 'Asset Type', key: 'type', required: true, defaultVisible: true, searchOrder: 'b' },
    { label: 'Owner/Department', key: 'department', defaultVisible: true, searchOrder: 'h' },
    { label: 'Location', key: 'keyLocation', defaultVisible: true, searchOrder: 'l' },
    { label: 'Model', key: 'model', searchOrder: 'j' },
    { label: 'Manufacturer', key: 'manufacturer', searchOrder: 'i' },
    { label: 'Description', key: 'description', searchOrder: 'k' },
    { label: 'Search Terms', key: 'search_terms', searchOrder: 'm' },
    { label: 'RFID Assigned', key: 'rfidAssigned' },
    { label: 'Serial Number', key: 'serial', searchOrder: 'f' },
    { label: 'Barcode Number', key: 'barcode', required: true, searchOrder: 'e' },
    { label: 'RFID Number', key: 'rfid', searchOrder: 'd' },
    { label: 'Notes', key: 'note', multiline: true, searchOrder: 'n' },
    { label: 'Image', key: 'image', hidden: true },
    { label: 'Update Location Date', key: 'lastUsedDate', hideOnEdit: true }
  ]

  getXlsxLabels() {
    if ( this.xlsTable.length && this.xlsTable[0] ) {
      return Object.keys(this.xlsTable[0])
    } else {
      return []
    }
  }

  setSheetToImport(xlsTable) {
    this.xlsTable = xlsTable
  }

  change(value, val) {
    this.active = { ...this.active, ...{ [value]: val } }
  }

  activate(activeId) {
    this.activeId = activeId
    if ( activeId === -1 ) {
      this.active = {}
      this.activeItem = {}
      return
    }
    const activeItem = { ...this.list.find(({ id }) => id === activeId) }
    this.active = this.labels.reduce((item, { key }) => {
      if ( !item.hasOwnProperty(key) ) {
        item[key] = null
      }
      return item
    }, activeItem || {})
    this.activeItem = activeItem
  }

  async remove(ids) {
    ids = Array.isArray(ids) ? ids : [ids]
    await Promise.all(ids.map(id => {
      return axios.delete(`/api/v1/hospital/assets/${ id }`)
    }))
    this.list = this.list.filter(({ id }) => !ids.includes(id))
  }

  async add() {
    const assetData = { ...this.active }

    delete assetData.keyLocation
    delete assetData.lastUsedDate

    const { data } = await axios.post('/api/v1/hospital/assets', toFormData(assetData))
    this.list.push(data)
    this.active = data
    this.activeItem = data
    return data
  }

  setRandomForActive() {
    const randData = generateLine(this.labels.filter(({ key }) => key !== 'id'))()
    this.activeItem = Object.assign({}, this.activeItem, randData)
    this.active = Object.assign({}, this.active, randData)
  }

  async update() {
    const assetData = { ...this.activeItem, ...this.active }
    delete assetData.keyLocation
    delete assetData.lastUsedDate
    // delete assetData.id
    const { data } = await axios.put(`/api/v1/hospital/assets/${ assetData.id }`, toFormData(assetData))
    return Object.assign(this.activeItem, this.active, data)
  }

  async changeSort(key){
    if ( this.sort.key === key && this.sort.asc === false ) {
      this.sort = {key: 'name',  asc: true}
    } else {
      this.sort = { key, asc: this.sort.key === key ? !this.sort.asc : true }
    }
    this.search()
  }

  async loadList() {
    this.tableLoading = true

    let sort
    if (this.sort.key) {
      sort = `${ this.sort.key },${ this.sort.asc ? 'asc' : 'desc' }`
    }
    const params = { ...this.searchParams, ...this.paging, size: 10, sort }
    const { data: { content, totalPages, totalElements } } = await axios.get('/api/v1/hospital/assets', { params })

    this.list = content
    this.totalPages = totalPages
    this.totalElements = totalElements
    this.tableLoading = false
  }
}

const assetsStore = new AssetsStore()

hydrate()('assetsStore', assetsStore).then(() => {
  console.log('assetsStore hydrated')
})

export default assetsStore

import { observable } from 'mobx'
import { axios, generateDemoTable, generateLine, toFormData } from 'common'
import { persist } from 'mobx-persist'
import labels from './labels.list'

const PAGE_SIZE = 10
const delay = () => new Promise(resolve => setTimeout(resolve, 1000))

export default class AssetsStore {
  labels = labels
  notifications = null

  @persist('list') @observable list = []
  @persist @observable totalPages = 1
  @persist @observable totalElements = 1

  @persist @observable previewImage

  setPreviewImage(item) {
    this.previewImage = item
  }

  @persist('object') @observable searchParams = {}
  @persist('object') @observable paging = { page: 0 }

  @persist @observable activeId = null
  @persist @observable stub = false
  @persist('object') @observable active = {}
  @persist('object') @observable activeItem = {}

  /** @example [{' stub field 1: ': 'some val 1'}] */
  @persist('list') @observable xlsTable = []
  @observable tableLoading = false
  @observable deletingItem = false
  @persist('object') @observable sort = { key: 'name', asc: true }
  @persist('object') @observable activeColumns = labels
    .filter(({ defaultVisible, alwaysInTable }) => defaultVisible || alwaysInTable)
    .map(({ key }) => key)
    .reduce((map, key) => (map[key] = true) && map, {})

  search() {
    this.paging.page = 0
    return this.loadList()
  }

  setPage(item) {
    this.paging.page = item
    return this.loadList()
  }

  activateColumn(columnName, active) {
    const newColumns = { ...this.activeColumns, [columnName]: active }
    const atLeastOneActive = Object.keys(newColumns).some(key => {
      return newColumns[key]
    })
    if ( atLeastOneActive ) {
      this.activeColumns = newColumns
    }
  }

  constructor(notifications){
    this.notifications = notifications
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

  getFieldsFromTable() {
    if ( this.xlsTable.length && this.xlsTable[0] ) {
      return Object.keys(this.xlsTable[0]).map(name => ({ name }))
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
    this.deletingItem = true
    ids = Array.isArray(ids) ? ids : [ids]
    if ( !this.stub ) {
      await Promise.all(ids.map(id => {
        return axios.delete(`/api/v1/hospital/assets/${ id }`)
      }))
    } else {
      await delay()
    }
    this.deletingItem = false

    this.list = this.list.filter(({ id }) => !ids.includes(id))
  }

  async add() {
    const assetData = { ...this.active, image: { data_uri: this.previewImage } }

    delete assetData.keyLocation
    delete assetData.lastUsedDate
    assetData.barcode = assetData.barcode - 0


    let newItem

    try {
      if ( this.stub ) {
        await delay()
        newItem = { ...this.active }
        this.notifications.info('Created Successfully')
      } else {
        const { data } = await axios.post('/api/v1/hospital/assets', assetData)
        newItem = data
      }
      this.list.push(newItem)
      this.active = newItem
      this.activeItem = newItem
      return newItem
    } catch (e) {
      this.notifications.error('Did not created')
      throw new Error(e)
    }
  }

  setRandomForActive() {
    const randData = generateLine(this.labels.filter(({ key }) => key !== 'id'))()
    this.activeItem = Object.assign({}, this.activeItem, randData)
    this.active = Object.assign({}, this.active, randData)
  }

  async update() {
    try {
      const assetData = { ...this.activeItem, ...this.active }
      delete assetData.keyLocation
      delete assetData.lastUsedDate
      // delete assetData.id
      let updatedItem
      if ( this.stub ) {
        await delay()
        updatedItem = assetData
      } else {
        const { data } = await axios.put(`/api/v1/hospital/assets/${ assetData.id }`, toFormData(assetData))
        updatedItem = data
      }
      this.notifications.info('Asset updated')
      return Object.assign(this.activeItem, this.active, updatedItem)
    } catch (e) {
      this.notifications.error('Did not updated')
      throw new Error(e)
    }
  }

  async changeSort(key) {
    if ( this.sort.key === key && this.sort.asc === false ) {
      this.sort = { key: 'name', asc: true }
    } else {
      this.sort = { key, asc: this.sort.key === key ? !this.sort.asc : true }
    }
    this.search()
  }

  async loadAutocompleteValues(key = 'department', query) {
    if ( key === 'rfidAssigned' ) {
      return await [
        'All Assets',
        'RFID Assigned',
        'RFID Not Assigned'
      ]
    } else if ( this.stub ) {
      await delay()
      return []
    } else {
      let term = {
          keyLocation: 'assets/keylocations',
          manufacture: 'assets/manufacturer'
        }[key] || `assets/${ key }`
      let params = null
      if ( query ) {
        params = { q: query }
      }
      let { data: { values, content } } = await axios.get(`/api/v1/hospital/${ term }`, { params })
      if ( key === 'keyLocation' ) {
        values = content.map(({ name }) => name)
      }
      return values
    }
  }

  async loadList() {
    this.tableLoading = true

    if ( this.stub ) {
      const content = generateDemoTable(this.labels, PAGE_SIZE)
      await delay()
      Object.assign(this, { list: content, totalPages: 1, totalElements: content.length })
    } else {
      let sort
      if ( this.sort.key ) {
        sort = `${ this.sort.key },${ this.sort.asc ? 'asc' : 'desc' }`
      }
      const params = { ...this.searchParams, ...this.paging, size: PAGE_SIZE, sort }

      const { data: { content, totalPages, totalElements } } = await axios.get('/api/v1/hospital/assets', { params })
      content.forEach(item => {
        const keyLocation = item.keyLocation || {}
        const searchTerms = keyLocation.searchTerms || []
        item.keyLocationObject = keyLocation
        item.keyLocation = keyLocation.name
        item.keyLocationId = keyLocation.id
        item.searchTerms = searchTerms.join(', ')
      })
      Object.assign(this, { list: content, totalPages, totalElements })
    }

    this.tableLoading = false
  }
}

import { computed, observable } from 'mobx'
import { axios, generateDemoTable, generateLine } from 'common'
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

  @persist @observable _previewImage = null

  @computed get previewImage() {
    return this._previewImage
  }

  setPreviewImage(data_url) {
    this._previewImage = data_url
    if ( !data_url && this.active.image ) {
      this.active.image = null
    }
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

  constructor(notifications) {
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
    if ( typeof val === 'string' ) {
      if ( ['description', 'notes'].includes(value) ) {
        if ( val.length > 1000 ) {
          val = val.slice(0, 1000)
        }
      } else if ( val > 50 ) {
        val = val.slice(0, 50)
      }
    }
    this.active = { ...this.active, ...{ [value]: val } }
  }

  activate(activeId) {
    this.activeId = activeId

    if ( activeId === -1 ) {
      this.active = {}
      this.activeItem = {}
      this._previewImage = null
    } else {
      const activeItem = this.list.find(({ id }) => id === activeId) || {}
      this.active = { ...activeItem }

      console.log('setting', this.active.image && this.active.image.id)
      if ( this.active.id && this.active.image ) {
        this._previewImage = `/api/v1/hospital/images/${ this.active.image.id }`
      }

      this.activeItem = activeItem
    }
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
    this.loadList()

    this.list = this.list.filter(({ id }) => !ids.includes(id))
  }

  async add() {
    const assetData = { ...this.active, image: { data_uri: this._previewImage } }

    this.labels.filter(label => {
      return label.hideOnCreate
    }).forEach(({ key }) => {
      delete assetData[key]
    })

    let newItem

    try {
      if ( this.stub ) {
        await delay()
        newItem = { ...this.active }
      } else {
        const { data } = await axios.post('/api/v1/hospital/assets', assetData)
        newItem = data
      }
      this.notifications.info('Asset saved')
      this.list.push(newItem)
      this.active = newItem
      this.activeItem = newItem
      return newItem
    } catch (e) {
      this.notifications.error('Asset not saved')
      return Promise.reject(e)
    }
  }

  setRandomForActive() {
    const randData = generateLine(this.labels.filter(({ hidden }) => !hidden))()
    this.active = Object.assign({}, this.active, randData)
  }

  async update() {
    try {
      let image
      if ( this._previewImage && !this._previewImage.includes('/api/v1/hospital/images') ) {
        image = { data_uri: this._previewImage }
      }
      const assetData = { ...this.activeItem, ...this.active, image }
      delete assetData.keyLocation
      delete assetData.lastUsedDate
      // delete assetData.id
      let updatedItem
      if ( this.stub ) {
        await delay()
        updatedItem = assetData
      } else {
        const { data } = await axios.put(`/api/v1/hospital/assets/${ assetData.id }`, assetData)
        updatedItem = data
      }
      this.notifications.info('Asset updated')
      Object.assign(this.active, updatedItem)
      Object.assign(this.activeItem, this.active)
      return this.active
    } catch (e) {
      this.notifications.error('Asset was not updated')
      return Promise.reject(e)
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
      let term = { manufacture: 'manufacturer' }[key] || key.toLowerCase()
      const params = query ? null : { q: query }
      const { data: { values } } = await axios.get(`/api/v1/hospital/assets/${ term }`, { params })
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

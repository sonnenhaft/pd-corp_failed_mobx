import { observable } from 'mobx'
import { generateDemoTable } from 'common'
import { history } from './Routing.store'
import { create as hydrate, persist } from 'mobx-persist'

const delay = () => new Promise(resolve => setTimeout(resolve, 1000))

class AssetsStore {
  @observable list = []

  @persist @observable activeId = null
  @persist('object') @observable active = {}
  @persist('object') @observable activeItem = {}

  /**
   * @example [{
   *    ' stub field 1: ': 'some val 1',
   *    ' stub field 2 ': 'some val 2'
   * }]
   */
  @persist('list') @observable xlsTable = []
  @persist('object') @observable sort = { key: 'id', asc: true }
  @persist('object') @observable activeColumns = {
    assetType: true,
    owner: true,
    location: true
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

  labels = [
    { label: 'id', key: 'id', hidden: true },
    { label: 'Asset Type', key: 'assetType', required: true, defaultVisible: true },
    { label: 'Asset Name', key: 'assetName', hidden: true },
    { label: 'Asset Number', key: 'assetNumber', hidden: true },
    { label: 'Owner/Department', key: 'owner', defaultVisible: true },
    { label: 'Location', key: 'location', defaultVisible: true },
    { label: 'Model', key: 'model' },
    { label: 'Manufacturer', key: 'manufacturer' },
    { label: 'Description', key: 'description' },
    { label: 'Search Terms', key: 'searchTerms' },
    { label: 'RFID Assigned', key: 'rfidAssigned', required: true },
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'Barcode Number', key: 'barcode', required: true },
    { label: 'RFID Number', key: 'rfidNumber' },
    { label: 'Update Location Date', key: 'locationUpdatedDate' },
    { label: 'Notes', key: 'notes' }
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
    await delay()
    ids = Array.isArray(ids) ? ids : [ids]
    this.list = this.list.filter(({ id }) => !ids.includes(id))
  }

  async add() {
    await delay()
    const newAsset = this.active
    newAsset.id = `${ Date.now()  }`
    this.list.push(newAsset)
    this.active = {}
    return newAsset
  }

  async update() {
    await delay()
    return Object.assign(this.activeItem, this.active)
  }

  constructor() {
    this.list = generateDemoTable(this.labels)
  }
}

const assetsStore = new AssetsStore()

hydrate()('assetsStore', assetsStore).then(() => {
  console.log('assetsStore hydrated')
})

history.subscribe(location => {
  const matches = /\/assets\/(edit|view)\/(.*)/.exec(location.pathname)
  if ( matches && (matches[2] !== assetsStore.activeId) ) {
    assetsStore.activate(matches[2])
  } else if ( !matches ) {
    assetsStore.activate(-1)
  }
})

export default assetsStore

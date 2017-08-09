import { action, observable } from 'mobx'
import { generateDemoTable } from 'common'
import { history } from './Routing.store'
import { create as hydrate, persist } from 'mobx-persist'

const delay = () => new Promise(resolve => setTimeout(resolve, 1000))

class AssetsStore {
  @observable list = []

  @persist @observable activeId = null
  @persist('object') @observable active = {}
  @persist('object') @observable activeItem = {}

  labels = [
    { label: 'id', key: 'id', hidden: true },
    { label: 'Asset/Equipment Number', key: 'assetNumber' },
    { label: 'Asset Type', key: 'asset_type' },
    { label: 'Asset Name', key: 'asset_name' },
    { label: 'Bar Code Number', key: 'barCode' },
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'Asset/Equipment Number', key: 'eq_number' },
    { label: 'Owner/Department', key: 'owner' },
    { label: 'Manufacturer', key: 'manufacturer' },
    { label: 'Model', key: 'model' },
    { label: 'Description', key: 'description' },
    { label: 'Notes', key: 'notes' },
    { label: 'Key Location', key: 'key_location' }
  ]

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
    newAsset.id = Date.now() + ''
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

hydrate()('assetsStore', assetsStore)
  .then(() => console.log('assetsStore hydrated'))

history.subscribe(location => {
  const matches = /\/assets\/(edit|view)\/(.*)/.exec(location.pathname)
  if ( matches && (matches[2] !== assetsStore.activeId) ) {
    assetsStore.activate(matches[2])
  } else if ( !matches ) {
    assetsStore.activate(-1)
  }
})

export default assetsStore

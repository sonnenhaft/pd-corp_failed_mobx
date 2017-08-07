import { observable } from 'mobx'
import { generateDemoTable } from 'common'
import { history } from './Routing.store'

class AssetsStore {
  @observable list = []

  @observable activeId = null
  @observable active = {}

  labels = [
    { label: 'id', key: 'id' },
    { label: 'Asset Number', key: 'asset_name' },
    { label: 'Asset Type', key: 'asset_type' },
    { label: 'RFID Number', key: 'rfid' },
    { label: 'Bar Code Number', key: 'barCode' },
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'Asset/Equipment Number', key: 'assetNumber' },
    { label: 'Owner/Department', key: 'owner' },
    { label: 'Manufacturer', key: 'manufacturer' },
    { label: 'Model', key: 'model' },
    { label: 'Description', key: 'description' },
    { label: 'Location', key: 'location' },
    { label: 'Notes', key: 'notes' },
    { label: 'Status', key: 'status' }
  ]

  activate(activeId) {
    this.activeId = activeId
    this.active = { ...this.list.find(({ id }) => id === activeId) }
    // this.active = this.list.find(({ id }) => id === activeId) || {}
  }

  remove(id) {
    return this.list.splice(this.list.findIndex(({ id: _id }) => _id === id), 1)
  }

  constructor() {
    this.list = generateDemoTable(this.labels)
  }
}

const assetsStore = new AssetsStore()

history.subscribe(location => {
  const matches = /\/assets\/(edit|view)\/(.*)/.exec(location.pathname)
  if ( matches && matches[2] !== assetsStore.activeId ) {
    assetsStore.activate(matches[2])
  }
})

export default assetsStore

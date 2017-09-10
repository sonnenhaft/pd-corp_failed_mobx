import { computed, observable } from 'mobx'
import { axios, delay, generateDemoTable, generateLine } from 'common'
import { persist } from 'mobx-persist'
import labels from './labels.list'
import { range } from 'lodash'

const DEFAULT_ASSETS_PAGE_SIZE = 10

/**
 * Its a major MobX store, which contains all state of  assets crud.
 * File is pretty long, but be sure it is pretty simple. There is possibility
 * to move most flag variables or maps like sort to another store.
 */
// TODO: split gods object to something else
export default class AssetsStore {
  /** @field { bool } flag that enables "no api" mode */
  @persist @observable stub = false

  /** @field { Array<label> } maps with field names of assets DTO */
  labels = labels

  /** @field { NotificationStore } */
  notifications = null

  /** @field { Array<asset> } current assets table array */
  @persist('list') @observable list = []

  /**
   * @field { number } current assets page, integer (api supports paging)
   * If will come 0 from api, then we say - no assets found,
   * that is why default value is 1 in here. Plus we don't display pagination
   * when count of pages is 1 or less.
   */
  @persist @observable totalPages = 1

  /** @field { bool } flag that remembers if  filters section on SearchInputs is expanded */
  @persist @observable filtersExpanded = false

  /** @field { number } integer total count of elements from API with current search params */
  @persist @observable totalElements = 0

  /** @field { number } integer number of current page from api */
  @persist @observable currentPage = 0

  @persist @observable _previewImage = null

  /** @return { string } */
  @computed get previewImage() {
    return this._previewImage
  }

  /** @param { string } data_url - base64 image from image input */
  set previewImage(data_url) {
    this._previewImage = data_url
    if ( !data_url && this.active.image ) {
      this.active.image = null
    }
  }

  /** @field { Object<string, string> } map that stores search configs to fetch assets table */
  @persist('object') @observable searchParams = {}

  /** @example [{' stub field 1: ': 'some val 1'}] */
  @persist('list') @observable xlsTable = []

  /** @field { bool } list loading flag */
  @observable tableLoading = false

  /** @field { bool } removing asset loading flag */
  @observable deletingItem = false

  /** @field { Object } map of 2 keys, key says field of sort, order says direction */
  @persist('object') @observable sort = { key: 'name', asc: true }

  /** @field { Object <string, bool> } contains names of asset fields that can be show in in table */
  @persist('object') @observable activeColumns = labels
    .reduce((map, { key }) => (map[key] = true) && map, {})

  /** @return { Array<label> } visible for table labels array */
  @computed get visibleLabels() {
    return this.labels.filter(({ key }) => this.activeColumns[key])
  }

  /** @field { string } id of selected (current viewed) asset */
  @persist @observable activeAssetId = null

  /** @field { asset } selected, "current" asset for "view" asset page */
  @persist('object') @observable active = {}

  /** @field { asset } editable analog of "active" field, for edit and create pages */
  @persist('object') @observable editableActiveAsset = {}
  /**
   * Basing on input id, it fills active and editableActiveAsset fields with current asset objects.
   * @param { string } activeAssetId of asset to make active
   */
  async activate(activeAssetId) {
    this.activeAssetId = activeAssetId

    if ( activeAssetId === -1 ) {
      this.active = {}
      this.editableActiveAsset = {}
      this._previewImage = null
    } else {
      let editableActiveAsset
      if ( this.list.length ) {
        editableActiveAsset = this.list.find(({ id }) => id === activeAssetId) || {}
      } else {
        if ( this.stub ) {
          await delay()
        } else {
          try {
            const { data } = await axios.get(`/api/v1/hospital/assets/${ activeAssetId }`)
            editableActiveAsset = data
          } catch (e) {
            this.notifications.error('Asset not found')
            return Promise.reject(e)
          }
        }
      }

      this.active = { ...editableActiveAsset }

      if ( this.active.id && this.active.image ) {
        this._previewImage = `/api/v1/hospital/images/${ this.active.image.id }`
      }

      this.editableActiveAsset = editableActiveAsset
    }
  }

  /**
   * Updates field of active asset and cut it of if it is string and it became too long.
   * @param { string } fieldName - asset field name from labels array
   * @param { string|any } newValue - new value of particular field
   */
  changeAndCutActiveAssetField(fieldName, newValue) {
    if ( typeof newValue === 'string' ) {
      if ( ['description', 'notes'].includes(fieldName) ) {
        if ( newValue.length > 1000 ) {
          newValue = newValue.slice(0, 1000)
        }
      } else if ( newValue.length > 50 ) {
        newValue = newValue.slice(0, 50)
      }
    }
    this.active = { ...this.active, ...{ [fieldName]: newValue } }
  }

  /** @param { NotificationStore } notifications */
  constructor(notifications) {
    this.notifications = notifications
  }

  /** @example "search button" action - resets paging to 0, and loads assets */
  search() {
    this.currentPage = 0
    return this.loadList()
  }

  /**
   * @param { number } nextPage - integer, sets new page and loads assets
   *
   * @return { Promise<Array<asset>> }
   */
  setPage(nextPage) {
    this.currentPage = nextPage
    return this.loadList()
  }

  /**
   * @example "checkbox" that decides to show or hide column in table
   * @param { string } fieldName - asset field name from labels array
   * @param { bool } active - flag to show or to hide column from table
   */
  activateColumn(fieldName, active) {
    const newColumns = { ...this.activeColumns, [fieldName]: active }
    const atLeastOneActive = Object.keys(newColumns).some(key => {
      return newColumns[key]
    })
    if ( atLeastOneActive ) {
      this.activeColumns = newColumns
    }
  }

  /** @return { Object<key, label> } labels object as map where key is label key */
  @computed get labelsMap() {
    return this.labels.reduce(((labelsMap, label) => {
      labelsMap[label.key] = label
      return labelsMap
    }), {})
  }

  /** fills "active" asset with random values */
  fillActiveAssetWithRandom() {
    const editableLabels = this.labels.filter(({ editOrder }) => editOrder)
    // note that object spread will not work in here because of MobX
    this.active = Object.assign({}, this.active, generateLine(editableLabels))
  }

  /** @param { string } key - asset field name from labels array */
  changeSort(key) {
    if ( this.sort.key === key && this.sort.asc === false ) {
      this.sort = { key: 'name', asc: true }
    } else {
      this.sort = { key, asc: this.sort.key === key ? !this.sort.asc : true }
    }
    return this.search()
  }

  /**
   * @example "autocomplete" that needs new values
   * @param { string } fieldName - asset field name from labels array
   * @param { string } query - filter for api that will return assets
   *
   * @return { Promise<Array<string>> }
   */
  async fetchAutoCompleteValues(fieldName, query) {
    if ( fieldName === 'rfidAssigned' ) {
      return await [
        'All Assets',
        'RFID Assigned',
        'RFID Not Assigned'
      ]
    } else if ( this.stub ) {
      await delay()
      const values = range(10).map(idx => `Stub "${ fieldName }" ${ idx + 1 }`)
      const filteredValues = values.filter(val => val.includes(query))
      return filteredValues.length ? filteredValues : values
    } else {
      const term = fieldName.toLowerCase()
      const params = query ? null : { q: query }
      const { data: { values } } = await axios.get(`/api/v1/hospital/assets/${ term }`, { params })
      return values
    }
  }

  /** CRUD "list" assets action */
  async loadList() {
    this.tableLoading = true

    if ( this.stub ) {
      const content = generateDemoTable(this.labels, DEFAULT_ASSETS_PAGE_SIZE)
      await delay()
      Object.assign(this, { list: content, totalPages: 1, totalElements: content.length })
    } else {
      let sort
      if ( this.sort.key ) {
        sort = `${ this.sort.key },${ this.sort.asc ? 'asc' : 'desc' }`
      }
      const params = { ...this.searchParams, page: this.currentPage, size: DEFAULT_ASSETS_PAGE_SIZE, sort }
      try {
        const { data: { content, totalPages, totalElements } } = await axios.get('/api/v1/hospital/assets', { params })
        Object.assign(this, { list: content, totalPages, totalElements })
      } catch (e) {
        this.notifications.error(e)
      }
    }

    this.tableLoading = false
  }

  /**
   * CRUD "create" asset action
   *
   * @return { Promise<asset> } created asset
   */
  async add() {
    let image
    if ( this._previewImage ) {
      image = { data_uri: this._previewImage }
    }

    const assetData = { ...this.active, image: image }

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
      this.editableActiveAsset = newItem
      return newItem
    } catch (e) {
      this.notifications.error('Asset not saved')
      return Promise.reject(e)
    }
  }

  /**
   * CRUD "update" asset action
   *
   * @return { Promise<asset> } updated asset
   */
  async update() {
    try {
      let image
      if ( this._previewImage && !this._previewImage.includes('/api/v1/hospital/images') ) {
        image = { data_uri: this._previewImage }
      }
      const assetData = { ...this.editableActiveAsset, ...this.active, image }
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
      Object.assign(this.editableActiveAsset, this.active)
      return this.active
    } catch (e) {
      this.notifications.error('Asset was not updated')
      return Promise.reject(e)
    }
  }

  /**
   * CRUD "delete" asset action
   * @param { string|Array<string> } id - single id or list of ids of assets to remove
   */
  async remove(id) {
    this.deletingItem = true
    id = Array.isArray(id) ? id : [id]
    if ( this.stub ) {
      await delay()
    } else {
      try {
        await Promise.all(id.map(id => {
          return axios.delete(`/api/v1/hospital/assets/${ id }`)
        }))
      } catch (e) {
        this.notifications.error(e)
      }
    }
    this.deletingItem = false
    this.list = this.list.filter(({ id }) => !id.includes(id))
    await this.loadList()
  }
}

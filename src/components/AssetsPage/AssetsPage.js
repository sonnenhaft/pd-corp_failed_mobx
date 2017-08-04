import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import AssetsPageHeader from './AssetsPageHeader'
import SearchInputs from './SearchInputs'
import PaginatableTable from './PaginatableTable'

import './AssetsPage.css'

const labels = [
  { label: 'Asset Number', key: 'asset_number' },
  { label: 'Asset Type', key: 'asset_type' },
  { label: 'Asset Name', key: 'assets_name' },
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

const AssetsPage = ({ list }) => <div>
  <AssetsPageHeader/>
  <div styleName="assets-page-content">
    <SearchInputs/>
    <PaginatableTable {...{ labels, data: list }}/>
  </div>
</div>

export default compose(
  connect(({ user, assets: { list } }) => ({ user, list }))
)(AssetsPage)

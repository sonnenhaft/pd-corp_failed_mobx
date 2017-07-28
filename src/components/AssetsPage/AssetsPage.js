import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { generateDemoTable } from 'utils'
import Paper from 'material-ui/Paper'

import AssetsPageHeader from './AssetsPageHeader'
import SearchInputs from './SearchInputs'
import PaginatableTable from './PaginatableTable'

import './AssetsPage.scss'

const labels = [
  { label: 'Asset Number', key: 'asset_number' },
  { label: 'Asset Name', key: 'asset_name' },
  { label: 'Key Location ID', key: 'key_location_id' },
  { label: 'Key Location Name', key: 'key_location_name' },
  { label: 'Asset Type', key: 'asset_type' },
  { label: 'Model Name', key: 'model_name' },
  { label: 'RFID #', key: 'rfid' },
  { label: 'Bar Code #', key: 'barCode' },
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

const data = generateDemoTable(labels)

const AssetsPage = () => {
  return <div>
    <AssetsPageHeader/>
    <div styleName="page-wrapper">
      <SearchInputs/>
      <Paper>
        <PaginatableTable {...{ labels, data }}/>
      </Paper>
    </div>
  </div>
}

export default compose(
  connect(({ user }) => ({ user }))
)(AssetsPage)

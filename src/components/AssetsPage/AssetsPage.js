import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { generateDemoTable } from 'common'
import { Card } from 'react-toolbox'

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

const data = generateDemoTable(labels)

const AssetsPage = () => {
  return <div>
    <AssetsPageHeader/>
    <div styleName="page-wrapper">
      <SearchInputs/>
      <Card>
        <PaginatableTable {...{ labels, data }}/>
      </Card>
    </div>
  </div>
}

export default compose(
  connect(({ user }) => ({ user }))
)(AssetsPage)

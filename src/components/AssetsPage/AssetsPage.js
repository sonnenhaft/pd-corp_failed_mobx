import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { generateDemoTable } from 'utils'
import { Card, CardText } from 'material-ui/Card'

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
  { label: 'Model Name', key: 'model_name1' },
  { label: 'Model Name', key: 'model_name2' },
  { label: 'Model Name', key: 'model_name3' },
  { label: 'Model Name', key: 'model_name4' },
  { label: 'Model Name', key: 'model_name5' },
  { label: 'Model Name', key: 'model_name6' },
  { label: 'Model Name', key: 'model_name7' },
  { label: 'Model Name', key: 'model_name8' }
]

const data = generateDemoTable(labels)

const AssetsPage = () => {
  return <div>
    <AssetsPageHeader/>
    <div styleName="page-wrapper">
      <SearchInputs/>
      <Card >
        <CardText>
          <PaginatableTable {...{ labels, data }}/>
        </CardText>
      </Card>
    </div>
  </div>
}

export default compose(
  connect(({ user }) => ({ user }))
)(AssetsPage)

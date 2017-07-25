import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, generateDemoTable } from 'utils'
import { Card, CardText } from 'material-ui/Card'

import AssetsPageHeader from './AssetsPageHeader'
import Table from './Table'
import SearchInputs from './SearchInputs'
import styles from './AssetsPage.scss'
import ReactPaginate from 'react-paginate'

const labels = [
  { label: 'Asset Number', key: 'asset_number' },
  { label: 'Asset Name', key: 'asset_name' },
  { label: 'Key Location ID', key: 'key_location_id' },
  { label: 'Key Location Name', key: 'key_location_name' },
  { label: 'Asset Type', key: 'asset_type' },
  { label: 'Model Name', key: 'model_name' }
  // { label: 'Model Name', key: 'model_name1' },
  // { label: 'Model Name', key: 'model_name2' },
  // { label: 'Model Name', key: 'model_name3' },
  // { label: 'Model Name', key: 'model_name4' }
]

const tableData = generateDemoTable(labels)

const AssetsPage = () => {
  return <div>
    <AssetsPageHeader/>
    <div styleName="page-wrapper">
      <SearchInputs/>
      <Card >
        <CardText>

          <div styleName="filter-button">
            <div>ASSETS FOUND ({tableData.length})</div>
            <Button>Filter columns (gear icon)</Button>
          </div>
          <div styleName="scrollable-table">
            <Table labels={labels} data={tableData}/>
          </div>

          <div>
            <ReactPaginate previousLabel={''}
                           nextLabel={'>'}
                           breakLabel={<a href="">...</a>}
                           breakClassName={'break-me'}
                           pageCount={120}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={styles['pagination']}
                           subContainerClassName={'pages pagination'}
                           activeClassName={'active'}/>
          </div>
        </CardText>
      </Card>
    </div>
  </div>
}

export default compose(
  connect(({ user }) => ({ user }))
)(AssetsPage)

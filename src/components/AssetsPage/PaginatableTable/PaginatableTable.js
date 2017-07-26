import React from 'react'
import ReactPaginate from 'react-paginate'

import CustomTable from './CustomTable'
import FilterColumnsButton from './FilterColumnsButton'
import styles from './PaginatableTable.scss'
import { compose, withHandlers, withState } from 'recompose'

const PaginatableTable = ({ labels, data, changeInactiveState, inactiveLabelsMap }) => {
  const tableLabels = labels.filter(({ key }) => !inactiveLabelsMap[key])

  return <div>
    <div styleName="filter-button">
      <div>ASSETS FOUND ({data.length})</div>
      <FilterColumnsButton {...{ labels, changeInactiveState, inactiveLabelsMap }} />
    </div>

    <CustomTable {...{ labels: tableLabels, data }}/>
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
  </div>
}

export default compose(
  withState('inactiveLabelsMap', 'setInactiveLabelsMap', {}),
  withHandlers({
    changeInactiveState: ({ setInactiveLabelsMap, inactiveLabelsMap }) => (isInactive, key) => {
      if ( isInactive ) {
        inactiveLabelsMap[key] = true
      } else {
        delete inactiveLabelsMap[key]
      }
      setInactiveLabelsMap(inactiveLabelsMap)
    }
  })
)(PaginatableTable)

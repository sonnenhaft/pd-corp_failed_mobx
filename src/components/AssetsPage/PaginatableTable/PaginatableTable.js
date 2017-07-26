import React from 'react'
import ReactPaginate from 'react-paginate'

import CustomTable from './CustomTable'
import FilterColumnsButton from './FilterColumnsButton'
import styles from './PaginatableTable.scss'
import { compose, onlyUpdateForKeys, withHandlers, withProps, withState } from 'recompose'

const PaginatableTable = props => {
  const { labels, data, changeInactiveState, inactiveLabelsMap, selectedIndexes, setSelectedIndexes, tableLabels } = props

  return <div>
    <div styleName="filter-button">
      <div>ASSETS FOUND ({data.length})</div>
      {!!selectedIndexes.length && <button>Delete</button>}
      <FilterColumnsButton {...{ labels, changeInactiveState, inactiveLabelsMap }} />
    </div>

    <CustomTable {...{ labels: tableLabels, data, setSelectedIndexes }}/>
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
  onlyUpdateForKeys(['labels', 'data']),
  withState('inactiveLabelsMap', 'setInactiveLabelsMap', {}),
  withProps(({ labels, inactiveLabelsMap }) => ({
    tableLabels: labels.filter(({ key }) => !inactiveLabelsMap[key])
  })),
  withState('selectedIndexes', 'setIndexes', []),
  withHandlers({
    setSelectedIndexes: ({ setIndexes, data }) => indexes => {
      if ( indexes === 'all' ) {
        indexes = data.map((item, index) => index)
      } else if ( indexes === 'none' ) {
        indexes = []
      }
      setIndexes(indexes)
    },
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

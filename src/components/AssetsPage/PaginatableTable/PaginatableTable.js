import React from 'react'
import ReactPaginate from 'react-paginate'

import CustomTable from './CustomTable'
import DeleteDialog from './DeleteDialog'
import FilterColumnsButton from './FilterColumnsButton'
import styles from './PaginatableTable.css'
import { compose, onlyUpdateForKeys, withHandlers, withProps, withState } from 'recompose'

import { Icon } from 'common'
import bulkDeleteIcon from './bulk-delete-icon.svg'
import Button from 'react-toolbox/lib/button'
import FontIcon from 'react-toolbox/lib/font_icon'

const PaginatableTable = props => {
  const { labels, data, changeInactiveState, inactiveLabelsMap, selectedIndexes, setSelectedIndexes, tableLabels, sort, setSort } = props

  return <div styleName="paginatable-table">
    <div styleName="filter-button">
      <div styleName="header">ASSETS FOUND ({data.length})</div>
      <div styleName="flex-buttons">
        <div styleName="some-right-wrapper">
          {!!selectedIndexes.length && <DeleteDialog>
            <Button raised>
              Delete
              &nbsp;&nbsp;
              <Icon svg={bulkDeleteIcon}/>
            </Button>
          </DeleteDialog>}
        </div>

        <FilterColumnsButton {...{ labels, changeInactiveState, inactiveLabelsMap }} />
      </div>
    </div>

    <CustomTable {...{ labels: tableLabels, data, setSelectedIndexes, sort, setSort, selectedIndexes }}/>
    <div>
      <ReactPaginate previousLabel={''}
                     nextLabel={<FontIcon value="keyboard_arrow_right"/>}
                     breakLabel={<span>...</span>}
                     breakClassName={styles['break-me']}
                     pageCount={12}
                     marginPagesDisplayed={2}
                     pageRangeDisplayed={5}
                     onPageChange={this.handlePageClick}
                     containerClassName={styles['pagination']}
                     subContainerClassName={'pages pagination'}
                     activeClassName={styles['active-page-link']}/>
    </div>
  </div>
}

export default compose(
  onlyUpdateForKeys(['labels', 'data']),
  withState('inactiveLabelsMap', 'setInactiveLabelsMap', {}),
  withState('sort', '_setSort', {}),
  withProps(({ labels, inactiveLabelsMap, sort }) => {
    if ( !sort.key ) {
      sort.key = labels[0].key
    }
    return {
      tableLabels: labels.filter(({ key }) => !inactiveLabelsMap[key]),
      sort
    }
  }),
  withState('selectedIndexes', 'setIndexes', []),
  withHandlers({
    setSort: ({ _setSort, sort }) => key => {
      if ( sort.key === key ) {
        sort.asc = !sort.asc
      } else {
        sort = { key, asc: true }
      }
      _setSort(sort)
    },
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

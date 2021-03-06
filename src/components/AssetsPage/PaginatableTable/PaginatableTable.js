import React from 'react'
import { compose, withProps, withState } from 'recompose'
import ReactPaginate from 'react-paginate'
import { Button, Card, FontIcon } from 'react-toolbox'

import { DeleteAssetsDialog, Icon } from 'common'
import Table from './Table'
import FilterColumnsButton from './FilterColumnsButton'
import styles from './PaginatableTable.css'
import bulkDeleteIcon from './bulk-delete-icon.svg'
import { assets, mobxConnect } from 'mobx-stores'

const PaginatableTable = props => {
  const { changeColumnStage, selectedIndexes, setSelectedIndexes, sort, setSort, assets } = props

  const { labels, list, totalPages } = assets
  const oneSelected = selectedIndexes.length === 1
  return <Card styleName="paginatable-table">
    {!totalPages && <div styleName="no-assets-wrapper">
      <div styleName="no-assets-header">NO ASSETS FOUND</div>
      <div>
        Try to make your search query simpler, or remove some filters.
      </div>

    </div>}

    {!!totalPages && <div>
      <div styleName="filter-button">
        <div styleName="header">ASSETS FOUND ({assets.totalElements})</div>
        <div styleName="flex-buttons">
          <div styleName="some-right-wrapper">
            {!!selectedIndexes.length && <DeleteAssetsDialog
              single={ oneSelected }
              action={ () => {
                const selectedIds = selectedIndexes.map(idx => list[idx].id)
                assets.remove(selectedIds).then(() => setSelectedIndexes([]))
              } }>
              <Button raised primary>
                Delete
                &nbsp;&nbsp;
                <Icon svg={ bulkDeleteIcon }/>
              </Button>
            </DeleteAssetsDialog>}
          </div>

          <FilterColumnsButton { ...{ labels, changeColumnStage, activeColumns: assets.activeColumns } } />
        </div>
      </div>

      <Table { ...{ labels: assets.visibleLabels, list, setSelectedIndexes, sort, setSort, selectedIndexes } }/>
      {totalPages > 1 && <div>
        <ReactPaginate
          nextLabel={ <FontIcon value="keyboard_arrow_right"/> }
          previousLabel={ <FontIcon value="keyboard_arrow_left"/> }
          breakLabel={ <span>...</span> }
          breakClassName={ styles['break-me'] }
          pageCount={ totalPages }
          marginPagesDisplayed={ 2 }
          pageRangeDisplayed={ 5 }
          onPageChange={ ({ selected }) => assets.setPage(selected) }
          containerClassName={ styles['pagination'] }
          previousClassName={ styles['next'] }
          nextClassName={ styles['prev'] }
          disabledClassName={ styles['page-disabled'] }
          subContainerClassName={ 'pages pagination' }
          activeClassName={ styles['active-page-link'] }
          forcePage={ assets.currentPage }/>
      </div>}
    </div>}
  </Card>
}

export default compose(
  withState('selectedIndexes', 'setIndexes', []),
  withProps(({ setIndexes }) => ({
    setSort(key) { assets.changeSort(key) },
    changeColumnStage(active, key) { assets.activateColumn(key, active) },
    setSelectedIndexes(indexes) {
      if ( indexes === 'all' ) {
        indexes = assets.list.map((ignored, index) => index)
      }
      setIndexes(indexes)
    }
  })),
  mobxConnect('assets')
)(PaginatableTable)

import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import ReactPaginate from 'react-paginate'
import { Button, Card, FontIcon } from 'react-toolbox'

import { Icon } from 'common'
import Table from './Table'
import DeleteDialog from './DeleteDialog'
import FilterColumnsButton from './FilterColumnsButton'
import styles from './PaginatableTable.css'
import bulkDeleteIcon from './bulk-delete-icon.svg'
import { assets } from 'mobx-stores'
import { inject, observer } from 'mobx-react'

const PaginatableTable = props => {
  const { changeColumnStage, selectedIndexes, setSelectedIndexes, sort, setSort, assets } = props

  const { labels, list, totalPages } = assets
  return <Card styleName="paginatable-table">
    {!totalPages && <div styleName="filter-button">
      <div styleName="header">NO ASSETS FOUND</div>
    </div>}

    {totalPages && <div>
      <div styleName="filter-button">
        <div styleName="header">ASSETS FOUND ({assets.totalElements})</div>
        <div styleName="flex-buttons">
          <div styleName="some-right-wrapper">
            {!!selectedIndexes.length && <DeleteDialog
            action={ () => {
              assets.remove(selectedIndexes.map(idx => list[idx].id)).then(() => {
                setSelectedIndexes([])
              })
            } }
            text="Are you sure you want to delete these assets?"
            title="Delete Assets">
              <Button raised primary>
                Delete
                &nbsp;&nbsp;
                <Icon svg={ bulkDeleteIcon }/>
              </Button>
            </DeleteDialog>}
          </div>

          <FilterColumnsButton { ...{ labels, changeColumnStage, activeColumns: assets.activeColumns } } />
        </div>
      </div>

      <Table { ...{ labels: assets.getVisibleLabels(), list, setSelectedIndexes, sort, setSort, selectedIndexes } }/>
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
          forcePage={ assets.paging.page }/>
      </div>}
    </div>}
  </Card>
}

export default compose(
  inject(() => {
    const { activeColumns, sort, totalPages, paging, totalElements } = assets
    return ({ assets, activeColumns, sort, totalPages, paging, totalElements })
  }),
  observer,
  withState('selectedIndexes', 'setIndexes', []),
  withHandlers({
    setSort: ({ assets }) => key => {
      assets.changeSort(key)
    },
    setSelectedIndexes: ({ setIndexes }) => indexes => {
      if ( indexes === 'all' ) {
        indexes = assets.list.map((item, index) => index)
      }
      setIndexes(indexes)
    },
    changeColumnStage: ({ assets }) => (active, columnName) => {
      assets.activeColumns = { ...assets.activeColumns, [columnName]: active }
    }
  })
)(PaginatableTable)

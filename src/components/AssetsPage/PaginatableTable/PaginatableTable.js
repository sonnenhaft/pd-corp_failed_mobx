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
import assets from 'mobx/Assets.store'
import { inject, observer } from 'mobx-react'

const PaginatableTable = props => {
  const { changeColumnStage, selectedIndexes, setSelectedIndexes, sort, setSort, assets } = props

  const { labels, list } = assets
  return <Card styleName="paginatable-table">
    <div styleName="filter-button">
      <div styleName="header">ASSETS FOUND ({list.length})</div>
      <div styleName="flex-buttons">
        <div styleName="some-right-wrapper">
          {!!selectedIndexes.length && <DeleteDialog action={() => {
            assets.remove(selectedIndexes.map(idx => list[idx].id)).then(() => {
              setSelectedIndexes([])
            })
          }}>
            <Button raised primary>
              Delete
              &nbsp;&nbsp;
              <Icon svg={bulkDeleteIcon}/>
            </Button>
          </DeleteDialog>}
        </div>

        <FilterColumnsButton {...{ labels, changeColumnStage, activeColumns: assets.activeColumns }} />
      </div>
    </div>

    <Table {...{ labels: assets.getVisibleLabels(), list, setSelectedIndexes, sort, setSort, selectedIndexes }}/>
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
  </Card>
}

export default compose(
  inject(() => {
    const { activeColumns, sort } = assets
    return ({ assets, activeColumns, sort })
  }),
  observer,
  withState('selectedIndexes', 'setIndexes', []),
  withHandlers({
    setSort: ({ assets }) => key => {
      assets.sort = { key, asc: assets.sort.key === key ? !assets.sort.asc : true }
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

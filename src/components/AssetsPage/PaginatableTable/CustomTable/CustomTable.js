import React from 'react'

import './CustomTable.scss'
import { compose, onlyUpdateForKeys } from 'recompose'
import { NavLink, withRouter } from 'react-router-dom'
import Table from './Table'
import DeleteDialog from '../DeleteDialog'
import { Button } from 'utils'

const ACTIONS_LABEL = [
  { label: '', key: 'action' }
]

const CustomTable = ({ labels, data, setSelectedIndexes, location, sort, setSort }) => {
  return <div styleName="tables-wrapper">
    <div styleName="scrollable-table">
      <Table {...{ labels, data, setSelectedIndexes, sort, setSort }}/>
    </div>
    <div styleName="actions-table">
      <Table labels={ACTIONS_LABEL} data={data} isSelectable={false}>
        { ({ index }) => <div>
          <div styleName="action">
            ---
            <div styleName="action-menu">
              <NavLink to={`${location.pathname}/edit/${index}`} replace exact>
                <Button>Update (icon in here)</Button>
              </NavLink>
              <DeleteDialog/>
            </div>
          </div>
        </div>}
      </Table>
    </div>
  </div>
}

export default compose(
  withRouter,
  onlyUpdateForKeys(['labels', 'data'])
)(CustomTable)

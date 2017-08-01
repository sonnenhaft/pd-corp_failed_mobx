import React from 'react'

import './CustomTable.scss'
import { compose, onlyUpdateForKeys } from 'recompose'
import { NavLink, withRouter } from 'react-router-dom'
import Table from './Table'
import DeleteDialog from '../DeleteDialog'
import { Icon, IconButton } from 'common/Icon'
import bulkDeleteIcon from './bulk-delete-icon.svg'
import updateIcon from './update-icon.svg'
import verticalDotsIcon from './vertical-dots-icon.svg'

const ACTIONS_LABEL = [
  { label: '', key: 'action' }
]

const CustomTable = ({ labels, data, setSelectedIndexes, location, sort, setSort, selectedIndexes }) => {
  return <div styleName="tables-wrapper">
    <div styleName="scrollable-table">
      <Table {...{ labels, data, setSelectedIndexes, sort, setSort, selectedIndexes }}/>
    </div>
    <div styleName="actions-table">
      <Table labels={ACTIONS_LABEL}
             {...{ selectedIndexes, data, setSelectedIndexes }}>
        { ({ index, selected }) => <div>
          <div styleName={`action ${selected ? 'selected' : ''}`}>
            <Icon svg={verticalDotsIcon}/>
            <div styleName="action-menu">
              <NavLink to={`${location.pathname}/edit/${index}`} replace exact>
                <IconButton tooltip="Update" svg={updateIcon}/>
              </NavLink>
              <DeleteDialog>
                <IconButton tooltip="Delete" svg={bulkDeleteIcon}/>
              </DeleteDialog>
            </div>
          </div>
        </div>}
      </Table>
    </div>
  </div>
}

export default compose(
  withRouter,
  onlyUpdateForKeys(['labels', 'data', 'selectedIndexes'])
)(CustomTable)

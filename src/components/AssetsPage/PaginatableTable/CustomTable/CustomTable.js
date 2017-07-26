import React from 'react'
import Table from './Table'
import './CustomTable.scss'

const ACTIONS_LABEL = [
  { label: '', key: 'action' }
]

const CustomTable = ({ labels, data }) => {
  const actionsData = data.map(() => ({}))

  return <div styleName="tables-wrapper">
    <div styleName="scrollable-table">
      <Table labels={labels} data={data}/>
    </div>
    <div styleName="actions-table">
      <Table labels={ACTIONS_LABEL} data={actionsData} isSelectable={false}>
        { () => <div>
          <div styleName="action">
            <div styleName="action-menu">
              act menu
              <button>ok</button>
              <button>cancel</button>
            </div>
          </div>
        </div>}
      </Table>
    </div>
  </div>
}

export default CustomTable

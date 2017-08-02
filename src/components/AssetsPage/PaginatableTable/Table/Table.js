import React from 'react'
import './Table.css'

import Checkbox from 'react-toolbox/lib/checkbox'

import { Icon, IconButton } from 'common'
import arrowAsc from './arrow-asc.svg'
import arrowDesc from './arrow-desc.svg'
import { compose, onlyUpdateForKeys } from 'recompose'
import { NavLink, withRouter } from 'react-router-dom'
import DeleteDialog from '../DeleteDialog'
import bulkDeleteIcon from './bulk-delete-icon.svg'
import updateIcon from './update-icon.svg'
import verticalDotsIcon from './vertical-dots-icon.svg'

const Table = ({ labels, data, children, setSelectedIndexes, sort, setSort, selectedIndexes, location }) => {

  const someSelected = selectedIndexes.length === data.length
  return <div styleName="custom-table-wrapper">
    <div styleName="table-scrollable-wrapper">
      <table styleName="custom-table">
        <thead>
        <tr>
          <th><Checkbox checked={someSelected} onChange={() => setSelectedIndexes(someSelected ? 'none' : 'all')}/></th>
          {labels.map(({ label, key }) => {
            const sortByThisKey = sort && sort.key === key
            return <th key={key} onClick={() => setSort(key)}>
              {setSort && <div >

                {sortByThisKey && <span styleName="current-th">
                {label}&nbsp;<Icon svg={sort.asc ? arrowAsc : arrowDesc}/>
              </span> }
                {!sortByThisKey && label }
              </div>}
              {!setSort && label}
            </th>
          })}
        </tr>
        </thead>
        <tbody>
        {data.map((row, index) => {
          const selected = selectedIndexes.includes(index)
          return <tr key={index} styleName={selected ? 'selected' : ''}>
            <td><Checkbox checked={selected} onChange={() => {
              if ( selected ) {
                const z = selectedIndexes.slice()
                z.splice(z.indexOf(index), 1)
                setSelectedIndexes(z)
              } else {
                setSelectedIndexes([...selectedIndexes, index])
              }
            }}/></td>
            {labels.map(({ key }) => {
              return <td key={key} title={row[key]}>
                {children ? children({ index, row, key, selected }) : row[key]}
              </td>
            })}
          </tr>
        })}
        </tbody>
      </table>
    </div>
    <div styleName="actions-row-wrapper">
      <div styleName="action-td-wrapper"/>
      {data.map((row, index) => {
        const selected = selectedIndexes.includes(index)
        return <div styleName={`action-td-wrapper ${selected ? 'selected' : ''}`} key={index}>
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
      })}
    </div>
  </div>
}

export default compose(
  withRouter,
  onlyUpdateForKeys(['labels', 'data', 'selectedIndexes'])
)(Table)


import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { compose, onlyUpdateForKeys, withState } from 'recompose'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react'
import Checkbox from 'react-toolbox/lib/checkbox'
import { Icon, IconButton, Tooltip } from 'common'

import DeleteDialog from '../DeleteDialog'
import { assets, routing } from 'mobx-stores'

import arrowAsc from './arrow-asc.svg'
import arrowDesc from './arrow-desc.svg'
import bulkDeleteIcon from './bulk-delete-icon.svg'
import verticalDotsIcon from './vertical-dots-icon.svg'
import updateIcon from './update-icon.svg'

import './Table.css'

const Table = ({ setSelectedIndexes, sort, setSort, selectedIndexes, location, hoveredIndex, setHoveredIndex, labels }) => {

  const someSelected = selectedIndexes.length > 0
  const visibleLabels = labels.filter(({ hidden }) => !hidden)
  const menuHidden = selectedIndexes.length > 1
  return <div>
    <div styleName="custom-table-wrapper">
      <div styleName="actions-row-wrapper" onMouseLeave={ () => setHoveredIndex(-1) }>
        <div styleName="action-td-wrapper">

          <Checkbox checked={ someSelected }
                    styleName={ classnames({ someSelected }) }
                    onChange={ () => setSelectedIndexes(someSelected ? [] : 'all') }/>
        </div>
        {assets.list.map((row, index) => {
          const selected = selectedIndexes.includes(index)
          const hovered = hoveredIndex === index

          return <div
            styleName={ classnames('action-td-wrapper', { selected: hovered || selected }) }
            key={ index }
            onMouseEnter={ () => setHoveredIndex(index) }>
            <Checkbox checked={ selected } onChange={ () => {
              if ( selected ) {
                const z = selectedIndexes.slice()
                z.splice(z.indexOf(index), 1)
                setSelectedIndexes(z)
              } else {
                setSelectedIndexes([...selectedIndexes, index])
              }
            } }/>
          </div>
        })}
      </div>
      <div styleName="table-scrollable-wrapper">
        <table styleName="custom-table">
          <thead>
          <tr>{visibleLabels.map(({ label, key }) => {
            const sortByThisKey = sort && sort.key === key
            return <th key={ key } onClick={ () => setSort(key) }>
              {setSort && <div >


                {sortByThisKey && <span styleName="current-th">
                {label}&nbsp;<Icon svg={ sort.asc ? arrowAsc : arrowDesc }/>
              </span> }
                {!sortByThisKey && label }
              </div>}
              {!setSort && label}
            </th>
          })}</tr>
          </thead>
          <tbody onMouseLeave={ () => setHoveredIndex(-1) }>
          {assets.list.map((row, index) => {
            const selected = selectedIndexes.includes(index)
            const hovered = hoveredIndex === index
            return <tr
              key={ index }
              styleName={ classnames({ selected: hovered || selected }) }
              onMouseEnter={ () => setHoveredIndex(index) }
              onClick={ () => { routing.push(`${ location.pathname }/view/${ row.id }`) } }>
              {visibleLabels.map(({ key }) => {
                const val = row[key] || ''
                return <td key={ key }>
                  {val.length > 21 ? <Tooltip text={ val } noArrow={ true }>
                    <div>{val}</div>
                  </Tooltip> : val}
                </td>
              })}
            </tr>
          })}
          </tbody>
        </table>
      </div>
      <div styleName="actions-row-wrapper" onMouseLeave={ () => setHoveredIndex(-1) }>
        <div styleName="action-td-wrapper"/>
        {assets.list.map((row, index) => {
          const selected = selectedIndexes.includes(index)
          const hovered = hoveredIndex === index
          return <div
            styleName={ classnames('action-td-wrapper', { selected: (hovered || selected) && !menuHidden }) }
            key={ index }
            onMouseEnter={ () => setHoveredIndex(index) }>
            <Icon svg={ verticalDotsIcon }/>
            <div styleName="action-menu">
              <NavLink to={ `${ location.pathname }/edit/${ row.id }` }>
                <Tooltip text="Edit">
                  <div>
                    <IconButton tooltip="Edit" svg={ updateIcon }/>
                  </div>
                </Tooltip>
              </NavLink>

              <DeleteDialog action={ () => assets.remove(row.id) }
                            text="Are you sure you want to delete this asset?"
                            title="Delete Asset">

                <Tooltip text="Delete">
                  <div>
                    <IconButton tooltip="Delete Asset" svg={ bulkDeleteIcon }/>
                  </div>
                </Tooltip>
              </DeleteDialog>
            </div>
          </div>
        })}
      </div>
    </div>
  </div>
}

export default compose(
  inject(() => ({ list: assets.list })),
  observer,
  withRouter,
  withState('hoveredIndex', 'setHoveredIndex', -1),
  onlyUpdateForKeys(['list', 'selectedIndexes', 'hoveredIndex', 'labels'])
)(Table)

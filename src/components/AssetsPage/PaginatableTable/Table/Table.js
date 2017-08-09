import React from 'react'
import './Table.css'

import Checkbox from 'react-toolbox/lib/checkbox'

import { Icon, IconButton } from 'common'
import arrowAsc from './arrow-asc.svg'
import arrowDesc from './arrow-desc.svg'
import { compose, onlyUpdateForKeys, withState } from 'recompose'
import { NavLink, withRouter } from 'react-router-dom'
import DeleteDialog from '../DeleteDialog'
import bulkDeleteIcon from './bulk-delete-icon.svg'
import updateIcon from './update-icon.svg'
import verticalDotsIcon from './vertical-dots-icon.svg'
import assets from 'mobx/Assets.store'
import { inject, observer } from 'mobx-react'

const Table = ({ setSelectedIndexes, sort, setSort, selectedIndexes, location, hoveredIndex, setHoveredIndex, history, assets }) => {

  const someSelected = selectedIndexes.length === assets.list.length
  const visibleLabels = assets.labels.filter(({hidden}) => !hidden)
  return <div styleName="custom-table-wrapper">
    <div styleName="actions-row-wrapper" onMouseLeave={() => setHoveredIndex(-1)}>
      <div styleName="action-td-wrapper">
        <Checkbox checked={someSelected} onChange={() => setSelectedIndexes(someSelected ? 'none' : 'all')}/>
      </div>
      {assets.list.map((row, index) => {
        const selected = selectedIndexes.includes(index)
        const hovered = hoveredIndex === index
        return <div styleName={`action-td-wrapper ${hovered || selected ? 'selected' : ''}`}
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
        >
          <Checkbox checked={selected} onChange={() => {
            if ( selected ) {
              const z = selectedIndexes.slice()
              z.splice(z.indexOf(index), 1)
              setSelectedIndexes(z)
            } else {
              setSelectedIndexes([...selectedIndexes, index])
            }
          }}/>
        </div>
      })}
    </div>
    <div styleName="table-scrollable-wrapper">
      <table styleName="custom-table">
        <thead>
        <tr>{visibleLabels.map(({ label, key }) => {
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
        })}</tr>
        </thead>
        <tbody onMouseLeave={() => setHoveredIndex(-1)}>
        {assets.list.map((row, index) => {
          const selected = selectedIndexes.includes(index)
          const hovered = hoveredIndex === index
          return <tr
            key={index}
            styleName={hovered || selected ? 'selected' : ''}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => { history.push(`${location.pathname}/view/${row.id}`) }}>
            {visibleLabels.map(({ key }) => <td key={key} title={row[key]}>{row[key]}</td>)}
          </tr>
        })}
        </tbody>
      </table>
    </div>
    <div styleName="actions-row-wrapper" onMouseLeave={() => setHoveredIndex(-1)}>
      <div styleName="action-td-wrapper"/>
      {assets.list.map((row, index) => {
        const selected = selectedIndexes.includes(index)
        const hovered = hoveredIndex === index
        return <div
          styleName={`action-td-wrapper ${hovered || selected ? 'selected' : ''}`}
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}>
          <Icon svg={verticalDotsIcon}/>
          <div styleName="action-menu">
            <NavLink to={`${location.pathname}/edit/${row.id}`}>
              <IconButton tooltip="Update" svg={updateIcon}/>
            </NavLink>
            <DeleteDialog action={() => assets.remove(row.id)} type="asset">
              <IconButton tooltip="Delete" svg={bulkDeleteIcon}/>
            </DeleteDialog>
          </div>
        </div>
      })}
    </div>
  </div>
}

export default compose(
  inject(() => ({ assets, list: assets.list })),
  observer,
  withRouter,
  withState('hoveredIndex', 'setHoveredIndex', -1),
  onlyUpdateForKeys(['assets', 'list', 'selectedIndexes', 'hoveredIndex'])
)(Table)

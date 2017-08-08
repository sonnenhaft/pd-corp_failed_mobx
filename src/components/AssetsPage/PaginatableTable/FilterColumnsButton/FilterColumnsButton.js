import React from 'react'
import { Icon, MenuButton } from 'common'
import Checkbox from 'react-toolbox/lib/checkbox'
import './FilterColumnsButton.css'
import configGearIcon from './config-gear-icon.svg'

const FilterColumnsButton = ({ labels, changeInactiveState, inactiveLabelsMap }) => <div>
  <MenuButton label={'Filter Columns'} raised icon={() => {
    return <span>&nbsp;&nbsp;<Icon svg={configGearIcon}/></span>
  }}>
    <div styleName="checkbox-wrapper">
      {labels.map(({ key, label }) => {
        const checked = !inactiveLabelsMap[key]
        return <Checkbox
          key={key}
          {...{ label, checked }}
          styleName={`checkbox ${checked ? '' : 'inactive-checkbox'}`}
          onChange={bool => changeInactiveState(!bool, key)}/>
      })}
    </div>
  </MenuButton>
</div>

export default FilterColumnsButton


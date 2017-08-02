import React from 'react'
import { PopoverButton } from 'common'
import Checkbox from 'react-toolbox/lib/checkbox'
import './FilterColumnsButton.css'

import { Icon } from 'common'
import configGearIcon from './config-gear-icon.svg'

const FilterColumnsButton = ({ labels, changeInactiveState, inactiveLabelsMap }) => <div>
  <PopoverButton label={() => {
    return <div>Filter Columns &nbsp;&nbsp;<Icon svg={configGearIcon}/></div>
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
  </PopoverButton>
</div>

export default FilterColumnsButton


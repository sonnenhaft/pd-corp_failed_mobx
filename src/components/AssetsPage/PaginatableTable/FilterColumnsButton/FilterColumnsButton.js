import React from 'react'
import PopoverButton from 'common/PopoverButton'
import { Checkbox } from 'utils'
import './FilterColumnsButton.scss'

import { Icon } from 'common/Icon'
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


import React from 'react'
import PopoverButton from 'common/PopoverButton'
import { Checkbox } from 'utils'
import './FilterColumnsButton.scss'

const FilterColumnsButton = ({ labels, changeInactiveState, inactiveLabelsMap }) => <div>
  <PopoverButton label={() => {
    return <div>Filter Columns (gear icon) {labels.length}</div>
  }}>
    <div styleName="checkbox-wrapper">
      {labels.map(({ key, label }) => {
        const checked = !inactiveLabelsMap[key]
        return <Checkbox
          key={key}
          {...{ label, checked }}
          styleName={`checkbox ${checked ? '' : 'inactive-checkbox'}`}
          onCheck={(ignored, bool) => changeInactiveState(!bool, key)}/>
      })}
    </div>
  </PopoverButton>
</div>

export default FilterColumnsButton


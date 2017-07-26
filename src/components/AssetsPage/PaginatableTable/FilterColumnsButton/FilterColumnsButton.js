import React from 'react'
import './FilterColumnsButton.scss'
import PopoverButton from 'common/PopoverButton'
import Checkbox from 'material-ui/Checkbox'

const FilterColumnsButton = ({ labels, changeInactiveState, inactiveLabelsMap }) => <div>
  <PopoverButton label={() => {
    return <div>Filter columns (gear icon) {labels.length}</div>
  }}>
    <div>
      {labels.map(({ key, label }) => <Checkbox
        key={key}
        label={label}
        checked={!inactiveLabelsMap[key]}
        onCheck={(ignored, bool) => changeInactiveState(!bool, key)}/>)}
    </div>
  </PopoverButton>
</div>

export default FilterColumnsButton


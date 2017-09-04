import React from 'react'
import cn from 'classnames'
import { Icon, MenuButton } from 'common'
import Checkbox from 'react-toolbox/lib/checkbox'
import './FilterColumnsButton.css'
import configGearIcon from './config-gear-icon.svg'

const FilterColumnsButton = ({ labels, changeColumnStage, activeColumns }) => <div>
  <MenuButton label="Show Columns" styleName="show-columns-button"
              raised icon={ () => {
    return <span>&nbsp;&nbsp;<Icon svg={ configGearIcon }/></span>
  } }>
    <div styleName="checkbox-wrapper">
      {labels
        .filter(({ hidden, alwaysInTable }) => !hidden && !alwaysInTable)
        .map(({ key, label }) => {
          const checked = activeColumns[key]
          return <Checkbox
            key={ key }
            { ...{ label, checked } }
            styleName={ cn('checkbox', { checked }) }
            onChange={ active => changeColumnStage(active, key) }/>
        })}
    </div>
  </MenuButton>
</div>

export default FilterColumnsButton


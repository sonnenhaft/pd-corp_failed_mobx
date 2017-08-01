import React from 'react'

import './SearchInputs.scss'
import { Icon } from 'common/Icon'
import searchIcon from './search-icon.svg'
import { Button, DropDown, TextInput } from 'utils'
import { DatePicker } from 'react-toolbox/lib/date_picker'
import { Card } from 'react-toolbox'
import { compose, withHandlers, withState } from 'recompose'
import FontIcon from 'react-toolbox/lib/font_icon'

const SearchInputs = ({ isExpaned, setIsExpanded, filter, setFilter, setSearch, search, resetFilters }) => {
  const setKey = key => value => {
    if ( value ) {
      filter[key] = value
    } else {
      delete filter[key]
    }
    setFilter(filter)
  }

  let isNotEmpty = !!Object.values(filter).length
  return <Card styleName="search-inputs-card">
    <div styleName="header">SEARCH</div>

    <div styleName="input-with-icon">
      <Icon svg={searchIcon} styleName="icon"/>
      <div styleName="input-wrapper">
        <TextInput hintText="Search" value={search} onChange={e => setSearch(e)}/>
      </div>
    </div>

    <div styleName="blue-text-buttons">
      <div onClick={() => setIsExpanded(!isExpaned)}>
        Advanced Search
        <FontIcon value={isExpaned ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  styleName="icon"/>
      </div>

      {isExpaned && isNotEmpty && <div onClick={resetFilters}>
        Reset fields
        <FontIcon value="refresh" styleName="icon"/>
      </div>}
    </div>


    {isExpaned && <div>
      <div styleName="search-input-buttons">
        <DropDown placeholder="Asset Type"/>
        <DropDown placeholder="Model Name"/>
        <DropDown placeholder="Key Location Name"/>
        <DropDown placeholder="Manufacturer"/>
        <DropDown placeholder="Status"/>
        <div styleName="date-inputs">
          <div>
            <DatePicker label="Last Update Date from"
                        onChange={setKey('dateFrom')}
                        value={filter.dateFrom}/>
          </div>
          <div>
            <DatePicker label="Last Update Date to"
                        onChange={setKey('dateTo')}
                        value={filter.dateTo}/>
          </div>
        </div>
      </div>
      <div styleName="search-button-wrapper">
        <Button
          primary={true}
          disabled={!isNotEmpty && !search}
          className="blue-button">
          SEARCH
        </Button>
      </div>
    </div>}
  </Card>
}
export default compose(
  withState('isExpaned', 'setIsExpanded', false),
  withState('filter', 'setFilter', {}),
  withState('search', 'setSearch', ''),
  withHandlers({
    resetFilters: ({ setFilter }) => () => setFilter({})
  })
)(SearchInputs)

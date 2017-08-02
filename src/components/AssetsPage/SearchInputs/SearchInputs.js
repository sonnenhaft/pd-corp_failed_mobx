import React from 'react'

import './SearchInputs.scss'
import { Icon } from 'common/Icon'
import searchIcon from './search-icon.svg'
import { Button, DropDown, TextInput } from 'utils'
import { DatePicker } from 'react-toolbox/lib/date_picker'
import { Card } from 'react-toolbox'
import { compose, withHandlers, withState } from 'recompose'
import FontIcon from 'react-toolbox/lib/font_icon'

import Ripple from 'react-toolbox/lib/ripple'
// eslint-disable-next-line no-unused-vars
const RippleDiv = Ripple({ spread: 1 })(({ theme, ...props }) => {
  return <div {...props} style={{ position: 'relative' }}>
    {props.children}
  </div>
})

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
        <TextInput label="Search" value={search} onChange={e => setSearch(e)}/>
      </div>
    </div>

    <div styleName="blue-text-buttons">
      <RippleDiv onClick={() => setIsExpanded(!isExpaned)}>
        Advanced Search
        <FontIcon value={isExpaned ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  styleName="icon"/>
      </RippleDiv>

      {isExpaned && isNotEmpty && <RippleDiv onClick={resetFilters}>
        Reset fields
        <FontIcon value="refresh" styleName="icon"/>
      </RippleDiv>}
    </div>


    {isExpaned && <div>
      <div styleName="search-input-buttons">
        <DropDown label="Asset Type"/>
        <DropDown label="Model Name"/>
        <DropDown label="Key Location Name"/>
        <DropDown label="Manufacturer"/>
        <DropDown label="Status"/>
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
          className="blue-button"
          onClick={() => alert('TODO: add search action')}>
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

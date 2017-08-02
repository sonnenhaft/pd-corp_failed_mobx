import React from 'react'

import './SearchInputs.css'
import { Icon } from 'common/Icon'
import searchIcon from './search-icon.svg'
import { TextInput } from 'utils'
import { Button, Card, Dropdown } from 'react-toolbox'
import { DatePicker } from 'react-toolbox/lib/date_picker'
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
        <Dropdown label="Asset Type" source={[]}/>
        <Dropdown label="Model Name" source={[]}/>
        <Dropdown label="Key Location Name" source={[]}/>
        <Dropdown label="Manufacturer" source={[]}/>
        <Dropdown label="Status" source={[]}/>
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
        <Button raised primary onClick={() => alert('TODO: add search action')}
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

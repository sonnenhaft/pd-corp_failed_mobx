import React from 'react'

import './SearchInputs.css'
import { TextInput, TextInputWithIcon } from 'common'
import searchIcon from './search-icon.svg'
import { Button, Card } from 'react-toolbox'
import { compose, withHandlers, withState } from 'recompose'
import FontIcon from 'react-toolbox/lib/font_icon'

import Ripple from 'react-toolbox/lib/ripple'
import { DatePicker } from 'react-toolbox/lib/date_picker'
// eslint-disable-next-line no-unused-vars
const RippleDiv = Ripple({ spread: 1 })(({ theme, ...props }) => {
  return <div {...props} style={{ position: 'relative' }}>
    {props.children}
  </div>
})

const SearchInputs = ({ isExpaned, setIsExpanded, filter, setSearch, search, resetFilters, keyChanged }) => {
  const isNotEmpty = !!Object.values(filter).length

  const searchButton = <div styleName="search-button-wrapper">
    <Button raised primary onClick={() => (isNotEmpty || search) && alert('TODO: add search action')}
            styleName="blue-button">
      SEARCH
    </Button>
  </div>

  return <Card styleName="search-inputs-card">
    <div styleName="header">SEARCH</div>

    <div styleName="input-with-button">
      <TextInputWithIcon
        icon={searchIcon}
        label={search ? '' : 'Type here'}
        value={search}
        onChange={setSearch}/>
      {!isExpaned && searchButton}
    </div>

    <div styleName="greyed-helper-text">
      Help text on how user can use it . such as comma
      separated AND operation on search terms.
    </div>


    <div styleName="blue-text-buttons">
      <RippleDiv onClick={() => setIsExpanded(!isExpaned)}>
        Filters
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
        <TextInput label="Asset Name" onChange={keyChanged('rfidAssigned')} value={filter.rfidAssigned || ''}/>
        <TextInput label="RFID" onChange={keyChanged('rfid')} value={filter.rfid || ''}/>
        <TextInput label="Bar Code" onChange={keyChanged('barCode')} value={filter.barCode || ''}/>
        <TextInput label="Serial Number" onChange={keyChanged('serialNumber')} value={filter.serialNumber || ''}/>
        <TextInput label="Asset/Equipment Number" onChange={keyChanged('eq_numer')} value={filter.eq_numer || ''}/>
        <TextInput label="Model" onChange={keyChanged('model')} value={filter.model || ''}/>
        <TextInput label="Description" onChange={keyChanged('description')} value={filter.description || ''}/>
        <TextInput label="Notes" onChange={keyChanged('notes')} value={filter.notes || ''}/>

        <div styleName="date-inputs">
          <DatePicker label="Last Update Date from"
                      onChange={keyChanged('dateFrom')}
                      icon="event"
                      value={filter.dateFrom}/>
          <DatePicker label="Last Update Date to"
                      onChange={keyChanged('dateTo')}
                      icon="event"
                      value={filter.dateTo}/>
        </div>

      </div>
      {searchButton}
    </div>}
  </Card>
}
export default compose(
  withState('isExpaned', 'setIsExpanded', false),
  withState('filter', 'setFilter', {}),
  withState('search', 'setSearch', ''),
  withHandlers({
    resetFilters: ({ setFilter }) => () => setFilter({}),
    keyChanged: ({ filter, setFilter }) => key => value => {
      if ( value ) {
        filter[key] = value
      } else {
        delete filter[key]
      }
      setFilter(filter)
    }
  })
)(SearchInputs)

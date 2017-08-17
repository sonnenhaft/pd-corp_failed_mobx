import React from 'react'

import './SearchInputs.css'
import { TextInput, TextInputWithIcon, RippleDiv } from 'common'
import searchIcon from './search-icon.svg'
import { Button, Card } from 'react-toolbox'
import { compose, withHandlers, withState } from 'recompose'
import FontIcon from 'react-toolbox/lib/font_icon'

import { DatePicker } from 'react-toolbox/lib/date_picker'

const SearchInputs = props => {
  const { expanded, setExpanded, filter, search, setSearch, resetFilters, keyChanged } = props
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
      {!expanded && searchButton}
    </div>

    <div styleName="greyed-helper-text">
      Help text on how user can use it . such as comma
      separated AND operation on search terms.
    </div>


    <div styleName="blue-text-buttons">
      <RippleDiv onClick={() => setExpanded(!expanded)}>
        Filters
        <FontIcon value={expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  styleName="icon"/>
      </RippleDiv>

      {expanded && isNotEmpty && <RippleDiv onClick={resetFilters}>
        Reset fields
        <FontIcon value="refresh" styleName="icon"/>
      </RippleDiv>}
    </div>

    {expanded && <div>
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
  withState('expanded', 'setExpanded', false),
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

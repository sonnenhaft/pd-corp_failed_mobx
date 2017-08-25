import React from 'react'

import './SearchInputs.css'
import { RippleDiv, StringDatePicker, TextInput, TextInputWithIcon } from 'common'
import searchIcon from './search-icon.svg'
import { Button, Card, ProgressBar } from 'react-toolbox'
import { compose, withHandlers, withState } from 'recompose'
import FontIcon from 'react-toolbox/lib/font_icon'
import { inject, observer } from 'mobx-react'
import { assets } from 'mobx-stores'

const SearchInputs = props => {
  const { expanded, setExpanded, resetFilters, keyChanged } = props
  const { assets } = props
  const searchParams = assets.searchParams
  const search = searchParams.search
  const isNotEmpty = !!Object.values(searchParams).length

  const searchButton = <div styleName="search-button-wrapper">
    <Button raised primary onClick={ () => assets.search() }
            styleName="blue-button">
      SEARCH
    </Button>
  </div>

  return <Card styleName="search-inputs-card">
    <div styleName="header">SEARCH</div>

    <div styleName="input-with-button">
      <TextInputWithIcon
        icon={ searchIcon }
        label={ search ? '' : 'Type here' }
        value={ search || '' }
        onChange={ keyChanged('search') }
        onEnterPressed={ () => search && search.length > 2 && assets.search()  }/>
      {!expanded && searchButton}
    </div>

    <div styleName="greyed-helper-text">
      Help text on how user can use it . such as comma
      separated AND operation on search terms.
    </div>

    <div styleName="blue-text-buttons">
      <RippleDiv onClick={ () => setExpanded(!expanded) }>
        Filters
        <FontIcon value={ expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }
                  styleName="icon"/>
      </RippleDiv>

      {expanded && isNotEmpty && <RippleDiv onClick={ resetFilters }>
        Reset fields
        <FontIcon value="refresh" styleName="icon"/>
      </RippleDiv>}
    </div>

    {expanded && <div>
      <div styleName="search-input-buttons">
        {assets.labels.filter(a => {
          return !a.hidden && !a.hideOnEdit
        }).sort((a, b) => {
          return a.searchOrder > b.searchOrder ? 1 : -1
        }).map(({ key, label }) => {
          return <TextInput key={ key } label={ label } onChange={ keyChanged(key) } value={ searchParams[key] || '' }/>
        })}

        <div styleName="date-inputs">
          <StringDatePicker label="Last Update Date from"
                            onChange={ keyChanged('fromUpdateLocationDate') }
                            icon="event"
                            value={ searchParams.fromUpdateLocationDate }/>
          <StringDatePicker label="Last Update Date to"
                            onChange={ keyChanged('toUpdateLocationDate') }
                            icon="event"
                            value={ searchParams.toUpdateLocationDate }/>
        </div>

      </div>
      {searchButton}
    </div>}
    <div styleName="absolute-loader">
      {assets.tableLoading && <ProgressBar type="linear" mode="indeterminate"/>}
    </div>
  </Card>
}
export default compose(
  inject(() => ({
    assets,
    searchParams: assets.searchParams,
    tableLoading: assets.tableLoading
  })),
  observer,
  withState('expanded', 'setExpanded', false),
  withHandlers({
    resetFilters: () => () => assets.searchParams = {},
    keyChanged: ({ assets }) => key => value => {
      if ( value ) {
        if ( key === 'search' ) {
          value = value.replace(',', '')
          if ( value > 500 ) {
            value = value.slice(0, 500)
          }
        }
      } else {
        value = undefined
      }
      assets.searchParams = { ...assets.searchParams, [key]: value }
    }
  })
)(SearchInputs)

import React from 'react'

import './SearchInputs.css'
import { RippleDiv, searchIcon, TextInputWithIcon, DateRangePicker } from 'common'
import { Button, Card, FontIcon, ProgressBar } from 'react-toolbox'
import { compose, withProps, withState } from 'recompose'
import { assets, extendObservable, mobxConnect } from 'mobx-stores'

import AssetsAutocomplete from './AssetsAutocomplete'

const SearchInputs = props => {
  const { setExpanded, resetFilters, keyChanged, focused, setFocused } = props
  const { assets } = props
  const expanded = assets.filtersExpanded
  const { search, ...searchParams } = assets.searchParams

  const isNotEmpty = !!Object.values(searchParams).length

  return <Card styleName="search-inputs-card">
    <div styleName="header">SEARCH</div>

    <div styleName="input-with-button">
      <TextInputWithIcon
        onFocus={ () => setFocused(true) }
        onBlur={ () => setFocused(false) }
        icon={ searchIcon }
        label={ focused || search ? '' : 'Type here' }
        value={ search || '' }
        onChange={ keyChanged('search') }
        onEnterPressed={ () => assets.search() }/>
      <div styleName="search-button-wrapper">
        <Button raised primary onClick={ () => assets.search() }
                styleName="blue-button">
          SEARCH
        </Button>
      </div>
    </div>

    <div styleName="greyed-helper-text">
      Please search by data fields comma
      separated .
      For example, to search by Asset Type and Asset
      Name enter “Monitors, PCA Module”
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
          return a.searchOrder
        }).sort((a, b) => {
          return a.searchOrder > b.searchOrder ? 1 : -1
        }).map(({ key, label, dateFilterKeys }) => {
          if ( dateFilterKeys ) {
            return <DateRangePicker
              key={ key }
              valuesObject={ searchParams }
              keyLabels={ dateFilterKeys }
              onKeyChanged={ keyChanged }/>
          } else {
            return <AssetsAutocomplete
              key={ key }
              field={ key }
              label={ label }
              onChange={ keyChanged(key) }
              value={ searchParams[key] || '' }/>
          }
        })}
      </div>
    </div>}
    <div styleName="absolute-loader">
      {(assets.tableLoading || assets.deletingItem) && <ProgressBar type="linear" mode="indeterminate"/>}
    </div>
  </Card>
}

export default compose(
  withState('focused', 'setFocused', false),
  withProps({
    setExpanded: () => assets.toggleFilters(),
    resetFilters: () => {
      const search = assets.searchParams.search
      assets.searchParams = extendObservable({ search })
      assets.search()
    },
    keyChanged: searchField => value => {
      assets.onSearchParamsChange(searchField, value)
    }
  }),
  mobxConnect('assets')
)(SearchInputs)

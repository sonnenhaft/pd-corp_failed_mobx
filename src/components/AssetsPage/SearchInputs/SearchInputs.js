import React from 'react'

import './SearchInputs.css'
import { RippleDiv, StringDatePicker, TextInputWithIcon } from 'common'
import searchIcon from './search-icon.svg'
import { Button, Card, ProgressBar } from 'react-toolbox'
import { compose, withHandlers, withState } from 'recompose'
import FontIcon from 'react-toolbox/lib/font_icon'
import { inject, observer } from 'mobx-react'
import { assets } from 'mobx-stores'

import AssetsAutocomplete from './AssetsAutocomplete'
const SearchInputs = props => {
  const { expanded, setExpanded, resetFilters, keyChanged } = props
  const { assets } = props
  const searchParams = assets.searchParams
  const search = searchParams.search
  const isNotEmpty = !!Object.values(searchParams).length

  return <Card styleName="search-inputs-card">
    <div styleName="header">SEARCH</div>

    <div styleName="input-with-button">
      <TextInputWithIcon
        icon={ searchIcon }
        label={ search ? '' : 'Type here' }
        value={ search || '' }
        onChange={ keyChanged('search') }
        onEnterPressed={ () => search && search.length > 2 && assets.search()  }/>
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
            const [l1, l2] = dateFilterKeys
            return <div styleName="date-inputs" key={ key }>
              {dateFilterKeys.map(({ key, label }) => <StringDatePicker
                label={ label }
                key={ key }
                onChange={ keyChanged(key) }
                value={ searchParams[key] }/>)}
              {searchParams[l1.key] > searchParams[l2.key] && <div styleName="date-error">
                <span>&quot;{l1.label}&quot;</span>
                &nbsp;should be greater or equal to&nbsp;
                <span>&quot;{l2.label}&quot;</span>
              </div>}
            </div>
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
  inject(() => ({
    assets,
    searchParams: assets.searchParams,
    tableLoading: assets.tableLoading,
    deletingItem: assets.deletingItem
  })),
  observer,
  withState('expanded', 'setExpanded', false),
  withHandlers({
    resetFilters: () => () => {
      assets.searchParams = {}
      assets.search()
    },
    keyChanged: ({ assets }) => key => value => {
      if ( value ) {
        if ( key === 'search' && value.length > 500 ) {
          value = value.slice(0, 500)
        }
      } else {
        value = undefined
      }
      assets.searchParams = { ...assets.searchParams, [key]: value }
    }
  })
)(SearchInputs)

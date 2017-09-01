import React from 'react'

import './AssetsAutocomplete.css'
import { ProgressBar } from 'react-toolbox'
import { compose, withPropsOnChange, withState } from 'recompose'
import { assets } from 'mobx-stores'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import { debounce } from 'lodash'
import cn from 'classnames'

const AssetsAutocomplete = ({ source, onFocus, localValue: value, onQueryChange, loading, label, onValueChange: onChange }) => {
  return <div styleName={ cn('autocomplete-wrapper', { loading }) }>
    <Autocomplete
      { ...{ label, source, onFocus, onChange, onQueryChange, value } }
      direction="down"
      selectedPosition="above"
      suggestionMatch="anywhere"
      multiple={ false }
      allowCreate={ true }/>
    {loading && <ProgressBar type="linear" mode="indeterminate" styleName="progress"/>}
  </div>
}

const update = debounce(action => action(), 500)

export default compose(
  withState('source', 'setSource', []),
  withState('loading', 'setLoading', false),
  withState('localValue', 'setLocalValue', ({ value }) => value),
  withPropsOnChange([], ({ setSource, setLoading, field }) => ({
    loadValues(query) {
      setLoading(true)
      assets.loadAutocompleteValues(field, query).then(source => {
        setLoading(false)
        setSource(source)
      })
    }
  })),
  withPropsOnChange([], ({ onChange, setLocalValue, loadValues }) => ({
    onValueChange(value) {
      setLocalValue(value)
      onChange(value)
    },
    onQueryChange(value){
      setLocalValue(value)
      update(() => {
        onChange(value)
        loadValues(value)
      })
    }
  })),
  withPropsOnChange(['source'], ({ source, loadValues }) => ({
    onFocus() {
      if ( !source.length ) {
        loadValues()
      }
    }
  }))
)(AssetsAutocomplete)


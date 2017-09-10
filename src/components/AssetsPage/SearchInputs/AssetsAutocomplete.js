import React from 'react'

import './AssetsAutocomplete.css'
import { ProgressBar } from 'react-toolbox'
import { compose, withPropsOnChange, withState } from 'recompose'
import { assets } from 'mobx-stores'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import { debounce } from 'lodash'
import cn from 'classnames'
import Mark from 'mark.js/dist/mark'

const AssetsAutocomplete = ({ source, onFocus, setRef, localValue: value, onQueryChange, loading, label, onValueChange: onChange }) => {
  return <div styleName={ cn('autocomplete-wrapper', { loading }) } ref={ setRef }>
    <Autocomplete
      { ...{ label, source, onFocus, onChange, onQueryChange, value } }
      direction="down"
      selectedPosition="above"
      className="highlitable-autocomplete"
      suggestionMatch="anywhere"
      multiple={ false }
      allowCreate={ true }/>
    {loading && <ProgressBar type="linear" mode="indeterminate" styleName="progress"/>}
  </div>
}

const update = debounce(action => action(), 500)

export default compose(
  withState('source', 'setSource', []),
  withState('reference', 'setRef', null),
  withState('loading', 'setLoading', false),
  withState('localValue', 'setLocalValue', ({ value }) => value),
  withPropsOnChange([], ({ setSource, setLoading, field }) => ({
    loadValues(query) {
      setLoading(true)
      assets.fetchAutoCompleteValues(field, query).then(source => {
        setLoading(false)
        setSource(source)
      })
    }
  })),
  withPropsOnChange(['reference'], ({ onChange, setLocalValue, loadValues, reference }) => ({
    onValueChange(value) {
      setLocalValue(value)
      onChange(value)
    },
    onQueryChange(value){
      const instance = new Mark(reference.querySelectorAll('li'))
      instance.unmark()
      instance.mark(value, { caseSensitive: false })

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


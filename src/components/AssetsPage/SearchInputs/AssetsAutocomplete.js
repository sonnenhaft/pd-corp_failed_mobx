import React from 'react'

import './AssetsAutocomplete.css'
import { ProgressBar } from 'react-toolbox'
import { compose, withHandlers, withState } from 'recompose'
import { assets } from 'mobx-stores'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import { debounce } from 'lodash'
import classnames from 'classnames'

const AssetsAutocomplete = ({ source, onFocus, value, onQueryChange, loading, label, onChange }) => {
  return <div styleName={ classnames('autocomplete-wrapper', { loading }) }>
    <Autocomplete
      direction="down"
      selectedPosition="above"
      label={ label }
      multiple={ false }
      allowCreate={ true }
      source={ source }
      onFocus={ onFocus }
      onQueryChange={ onQueryChange }
      onChange={ onChange }
      value={ value }
    />
    {loading && <ProgressBar type="linear" mode="indeterminate" styleName="progress"/>}
  </div>
}

const update = debounce(action => action(), 300)

export default compose(
  withState('source', 'setSource', []),
  withState('loading', 'setLoading', false),
  withHandlers({
    loadValues: ({ setSource, setLoading, field }) => query => {
      setLoading(true)
      assets.loadAutocompleteValues(field, query).then(source => {
        setLoading(false)
        setSource(source)
      })
    }
  }),
  withHandlers({
    onQueryChange: ({ loadValues, onChange }) => value => {
      onChange(value)
      update(() => loadValues(value))
    },
    onFocus: ({ source, loadValues }) => () => {
      if ( !source.length ) {
        loadValues()
      }
    }
  })
)(AssetsAutocomplete)


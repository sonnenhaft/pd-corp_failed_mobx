import React from 'react'
import P from 'prop-types'
import { compose, setPropTypes, withState } from 'recompose'
import Input from 'react-toolbox/lib/input'

import './TextInput.css'

export const TextInput = ({ errorText, ...props }) => {
  const { multiline, disabled } = props
  if ( multiline && disabled ) {
    return <DisabledTextArea { ...props }/>
  } else {
    return <section>
      <Input type="text" { ...props }/>
      {errorText && <div><br/><br/></div>}
    </section>
  }
}

const MAX_LEN = 250
const DisabledTextAreaDummy = ({ setExpanded, expanded, multiline, value = '', disabled, label }) => {
  const collsapsible = multiline && value.length > MAX_LEN && disabled

  return <section styleName="content">
    <label styleName="label">{label}</label>
    {collsapsible && <div>
      {expanded ? value : `${ value.slice(0, MAX_LEN) }...`}
      <a onClick={ () => setExpanded(!expanded) } styleName="expandable-button">
        {expanded ? 'Collapse' : 'Expand'}
      </a>
    </div>}
    {!collsapsible && <div>{value}</div>}
  </section>
}

const DisabledTextArea = compose(
  setPropTypes({
    multiline: P.bool,
    value: P.string,
    disabled: P.bool,
    label: P.string
  }),
  withState('expanded', 'setExpanded', false)
)(DisabledTextAreaDummy)

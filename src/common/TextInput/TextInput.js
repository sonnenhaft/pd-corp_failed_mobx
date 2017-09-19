import React from 'react'
import P from 'prop-types'
import { compose, setPropTypes, withState } from 'recompose'
import Input from 'react-toolbox/lib/input'
import cn from 'classnames'

import './TextInput.css'

export const TextInput = ({ errorText, onEnterPressed, className, ...props }) => {
  const onKeyPress = onEnterPressed && (e => e.key === 'Enter' && onEnterPressed())
  let { multiline, disabled, value, ...leftProps } = props
  if ( multiline && disabled ) {
    return <DisabledTextArea { ...{ ...leftProps, onKeyPress, value } } className={ className }/>
  } else {
    if ( disabled && !props.value ) {
      value = ' '
    }
    return <section className={ className }
                    styleName={ cn(className, { disabledInput: disabled }) }>
      <Input type="text" { ...{ ...leftProps, onKeyPress, value } }/>
      {disabled && <span styleName="wrappable-value greyed-input">{value}</span>}
      {errorText && <div><br/><br/></div>}
    </section>
  }
}

const MAX_LEN = 250
const DisabledTextAreaDummy = props => {
  const { className, setExpanded, expanded, multiline, value = '', disabled, label } = props
  const collsapsible = multiline && value.length > MAX_LEN && disabled

  return <section styleName="content" className={ className }>
    <label styleName="label">{label}</label>
    {collsapsible && <div styleName="wrappable-value">
      {expanded ? value : `${ value.slice(0, MAX_LEN) }...`}
      <a onClick={ () => setExpanded(!expanded) } styleName="expandable-button">
        {expanded ? 'Collapse' : 'Expand'}
      </a>
    </div>}
    {!collsapsible && <div styleName="wrappable-value">{value}</div>}
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

import React from 'react'
import P from 'prop-types'
import { branch, compose, mapProps, renderComponent, setPropTypes, withPropsOnChange, withState } from 'recompose'
import cn from 'classnames'
import Input from 'react-toolbox/lib/input'

import './TextInput.css'

const WrappedInput = (({ errorText, className, disabledInput, ...props }) => <section
  styleName={ cn({ disabledInput }) }
  className={ className }>
  <Input type="text" { ...props }/>
  {disabledInput && <span styleName="wrappable-value greyed-input">
        {props.value}
  </span>}
  {errorText && <div><br/><br/></div>}
</section>)

const MAX_TEXT_AREA_LENGTH = 250
const DisabledMultilineInput = compose(
  withState('expanded', 'setExpanded', false)
)(({ className, setExpanded, expanded, multiline, value, disabled, label }) => {
  const collapsible = multiline && value.length > MAX_TEXT_AREA_LENGTH && disabled

  return <section styleName="content" className={ className }>
    <label styleName="label">{label}</label>
    {collapsible && <div styleName="wrappable-value">
      {expanded ? value : `${ value.slice(0, MAX_TEXT_AREA_LENGTH) }...`}
      <a onClick={ () => setExpanded(!expanded) } styleName="expandable-button">
        {expanded ? 'Collapse' : 'Expand'}
      </a>
    </div>}
    {!collapsible && <div styleName="wrappable-value">{value}</div>}
  </section>
})

export const TextInput = compose(
  setPropTypes({
    multiline: P.bool,
    value: P.string,
    className: P.string,
    disabled: P.bool,
    label: P.string
  }),
  withPropsOnChange(['onEnterPressed'], ({ onEnterPressed }) => ({
    onKeyPress(e) { onEnterPressed && e.key === 'Enter' && onEnterPressed()}
  })),
  withPropsOnChange(['value', 'onChange', 'disabled'], ({ value, onChange, disabled }) => ({
    onBlur() { typeof value === 'string' && onChange(value.trim())},
    value: (disabled && !value) ? ' ' : (value || ''),
    disabledInput: disabled && value
  })),
  // eslint-disable-next-line no-unused-vars
  mapProps(({ onEnterPressed, ...props }) => props),
  branch(
    ({ multiline, disabled }) => multiline && disabled,
    renderComponent(DisabledMultilineInput),
    renderComponent(WrappedInput)
  )
)(() => null)

import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon'

import { Icon } from '../Icon'
import { TextInput } from './TextInput'

import './TextInputWithIcon.css'

export const TextInputWithIcon = ({ icon, value, onChange, ...props, onEnterPressed }) => {
  return <div styleName="input-with-icon">
    <Icon svg={ icon } styleName="icon"/>
    <div styleName="input-wrapper">
      <TextInput { ...{ ...props, onEnterPressed, value, onChange } } />
    </div>

    {value && <div styleName="icon back-icon" onClick={ () => onChange('') }>
      <FontIcon value="add_circle"/>
      <FontIcon value="add_circle_outline"/>
    </div>}
  </div>
}

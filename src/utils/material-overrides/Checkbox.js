import React from 'react'
import RtCheckbox from 'react-toolbox/lib/checkbox'

export const Checkbox = ({ label, checked, onCheck, className }) => {
  return <RtCheckbox {...{label, checked, onChange: onCheck, className}}/>
}

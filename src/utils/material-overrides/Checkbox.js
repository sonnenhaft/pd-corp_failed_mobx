import React from 'react'
import UiCheckbox from 'material-ui/Checkbox'

export const Checkbox = ({ label, checked, onCheck, className }) => {
  return <UiCheckbox {...{ label, checked, onCheck, className }}
                     iconStyle={{ width: '19px', marginRight: '6px' }}
  />
}

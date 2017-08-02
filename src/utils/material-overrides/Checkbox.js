import React from 'react'
import RtCheckbox from 'react-toolbox/lib/checkbox'

export const Checkbox = ({ className, ...props }) => {
  return <RtCheckbox {...{ ...props, className }}/>
}

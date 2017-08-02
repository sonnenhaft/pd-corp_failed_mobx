import React from 'react'

import Ripple from 'react-toolbox/lib/ripple'

// eslint-disable-next-line no-unused-vars
export const RippleDiv = Ripple({ spread: 1 })(({ theme, ...props }) => {
  return <div {...props} style={{ position: 'relative' }}>
    {props.children}
  </div>
})

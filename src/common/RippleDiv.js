import React from 'react'

import Ripple from 'react-toolbox/lib/ripple'

// eslint-disable-next-line no-unused-vars
export const RippleDiv = Ripple({ spread: 1 })(({ theme, children, ...props }) => {
  return <div { ...props } style={ { position: 'relative' } }>
    {children}
  </div>
})

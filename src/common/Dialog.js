import React from 'react'
import { compose, withState } from 'recompose'

import RtDialog from 'react-toolbox/lib/dialog'

const Dialog = ({ isOpened, setIsOpened, children, content }) => {
  const handleClose = () => setIsOpened(false)
  const actions = [
    { label: 'Cancel', onClick: handleClose },
    { label: 'Submit', onClick: handleClose }
  ]

  return <div>
    <div onClick={() => setIsOpened(!isOpened)}>
      {children}
    </div>
    <RtDialog
      actions={actions}
      active={isOpened}
      onEscKeyDown={handleClose}
      onOverlayClick={handleClose}
      title="Dialog With Actions"
    >
      {content()}
    </RtDialog>
  </div>
}

export default compose(
  withState('isOpened', 'setIsOpened', false)
)(Dialog)

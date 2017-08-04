import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

import RtDialog from 'react-toolbox/lib/dialog'

const Dialog = ({ handleClose, handleOpen, handleSubmit, isOpened, children, content }) => {
  return <div>
    <div onClick={handleOpen}>{children}</div>
    <RtDialog
      actions={[
        { label: 'Cancel', onClick: handleClose },
        { label: 'Submit', onClick: handleSubmit }
      ]}
      active={isOpened}
      onEscKeyDown={handleClose}
      onOverlayClick={handleClose}
      title="Dialog With Actions">
      {content()}
    </RtDialog>
  </div>
}

export default compose(
  withState('isOpened', 'setIsOpened', false),
  withHandlers({
    handleClose: ({ setIsOpened }) => () => setIsOpened(false),
    handleOpen: ({ setIsOpened }) => () => setIsOpened(true),
    handleSubmit: ({ setIsOpened, action }) => () => {
      setIsOpened(false)
      if ( action ) {
        action()
      }
    }
  })
)(Dialog)

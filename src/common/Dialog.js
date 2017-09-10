import React from 'react'
import P from 'prop-types'

import { compose, setPropTypes, withProps, withPropsOnChange, withState } from 'recompose'

import RtDialog from 'react-toolbox/lib/dialog'

const Dialog = props => {
  const { handleClose, handleOpen, handleSubmit, opened, children, content, title } = props
  const { okLabel = 'Submit', cancelLabel = 'Cancel' } = props
  return <div>
    <div onClick={ handleOpen }>{children}</div>
    <RtDialog
      actions={ [
        { label: cancelLabel, onClick: handleClose },
        { label: okLabel, onClick: handleSubmit }
      ] }
      active={ opened }
      onEscKeyDown={ handleClose }
      onOverlayClick={ handleClose }
      title={ title || '' }>
      <div>{content}</div>
    </RtDialog>
  </div>
}

export default compose(
  setPropTypes({
    children: P.element.isRequired,
    content: P.string.isRequired
  }),
  withState('opened', 'setOpened', false),
  withProps(({ setOpened }) => ({
    handleClose() { setOpened(false) },
    handleOpen() { setOpened(true) }
  })),
  withPropsOnChange(['action'], ({ action, handleClose }) => ({
    handleSubmit() {
      handleClose()
      if ( action ) {
        action()
      }
    }
  }))
)(Dialog)

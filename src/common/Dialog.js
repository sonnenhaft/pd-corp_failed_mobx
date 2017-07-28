import React from 'react'
import UiDialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { compose, withState } from 'recompose'

const Dialog = ({ isOpened, setIsOpened, label, content }) => {
  const handleClose = () => setIsOpened(false)
  const actions = [
    <FlatButton label="Cancel" primary={true} onTouchTap={handleClose}/>,
    <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={handleClose}/>
  ]

  return <div>
    <div onClick={() => setIsOpened(!isOpened)}>
      {label()}
    </div>

    <UiDialog
      title="Dialog With Actions"
      actions={actions}
      modal={false}
      open={isOpened}
      onRequestClose={handleClose}
    >
      {content()}
    </UiDialog>
  </div>
}

export default compose(
  withState('isOpened', 'setIsOpened', false)
)(Dialog)


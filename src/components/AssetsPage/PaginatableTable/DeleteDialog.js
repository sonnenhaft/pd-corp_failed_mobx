import React from 'react'
import { Dialog } from 'common'

const DeleteDialog = ({ children, action, text, title }) => <Dialog
  action={ action }
  okLabel="Yes"
  cancelLabel="No"
  title={ title }
  content={ text }>
  {children}
</Dialog>

export default DeleteDialog

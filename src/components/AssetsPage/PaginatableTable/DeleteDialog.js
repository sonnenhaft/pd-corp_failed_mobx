import React from 'react'
import { Dialog } from 'common'

const DeleteDialog = ({ children, action, type }) => <Dialog
  action={ action }
  content={ () => <div>Are you sure you want to delete this {type}?</div> }>
  {children}
</Dialog>

export default DeleteDialog

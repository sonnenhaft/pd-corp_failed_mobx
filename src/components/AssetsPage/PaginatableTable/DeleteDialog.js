import React from 'react'
import Dialog from 'common/Dialog'

const DeleteDialog = ({children}) => <Dialog
  content={() => <div>
    Are you sure you want to remove?
  </div>}>
  {children}
</Dialog>

export default DeleteDialog

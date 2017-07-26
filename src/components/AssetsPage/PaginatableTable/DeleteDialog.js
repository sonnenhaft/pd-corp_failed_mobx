import React from 'react'
import Dialog from 'common/Dialog'

const DeleteDialog = () => <Dialog
  label={() => <div>delete icon</div>}
  content={() => <div>
    Are you sure you want to remove?
  </div>}>
</Dialog>

export default DeleteDialog

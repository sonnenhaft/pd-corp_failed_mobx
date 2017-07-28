import React from 'react'
import Dialog from 'common/Dialog'
import { Button } from 'utils'

const DeleteDialog = () => <Dialog
  label={() => <Button>Delete (icon in here)</Button>}
  content={() => <div>
    Are you sure you want to remove?
    // TODO(vlad): add proper message
  </div>}>
</Dialog>

export default DeleteDialog

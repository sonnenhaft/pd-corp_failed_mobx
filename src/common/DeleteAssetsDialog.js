import React from 'react'
import { Dialog } from 'common'

export const DeleteAssetsDialog = ({ action, children, single = true }) => <Dialog
  okLabel="Yes"
  cancelLabel="No"
  action={ action }
  content={ `Are you sure you want to delete ${ single ? 'this' : 'these' } asset${ single ? '' : 's' }?` }
  title={ `Delete Asset${ single ? '' : 's' }` }>
  {children}
</Dialog>

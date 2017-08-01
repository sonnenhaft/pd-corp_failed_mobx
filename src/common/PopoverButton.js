import React from 'react'
import { Button } from 'utils'
import { Popover } from 'material-ui/Popover'
import { compose, withState } from 'recompose'

const PopoverButton = ({ refButton, isOpened, setIsOpened, setRefButton, label, children }) => <div>
  <Button onClick={e => {
    setRefButton(e.currentTarget)
    setIsOpened(!isOpened)
  }}>
    {label()}
  </Button>

  <Popover
    open={isOpened}
    anchorEl={refButton}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    onRequestClose={() => setIsOpened(false)}
  >
    <div>{children}</div>
  </Popover>

</div>

export default compose(
  withState('isOpened', 'setIsOpened', false),
  withState('refButton', 'setRefButton', null)
)(PopoverButton)


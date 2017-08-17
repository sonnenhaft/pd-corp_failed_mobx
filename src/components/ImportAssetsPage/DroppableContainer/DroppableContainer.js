import React from 'react'
import P from 'prop-types'
import { DropTarget } from 'react-dnd'

import './DroppableContainer.css'
import DraggableItem from '../DraggableItem'

import { compose, setPropTypes } from 'recompose'

const DroppableContainer = props => {
  const { isOver, canDrop, connectDropTarget } = props
  const isActive = isOver && canDrop

  let backgroundColor = '#fff'
  if ( isActive ) {
    backgroundColor = 'rgb(157, 198, 254)'
  } else if ( canDrop ) {
    backgroundColor = 'rgb(225, 236, 255)'
  }


  return connectDropTarget(
    <div>
      <div styleName="field-name">
        { props.label }{props.required ? '*' : ''}
      </div>
      <div style={{ backgroundColor }}
           styleName={`droppable-container ${props.lastDroppedItem ? 'filledContainer' : ''}`}>
        {props.lastDroppedItem && <DraggableItem
          name={props.lastDroppedItem.name}
          styleName="inlined-item"
          onRemove={() => props.onRemove(props.lastDroppedItem)}/>}
      </div>
    </div>
  )
}

export default compose(
  setPropTypes({
    lastDroppedItem: P.object,
    label: P.string.isRequired,
    fieldKey: P.string.isRequired,
    onRemove: P.func
  }),
  DropTarget(() => 'any', {
    drop: (props, monitor) => props.onDrop(monitor.getItem())
  }, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(DroppableContainer)

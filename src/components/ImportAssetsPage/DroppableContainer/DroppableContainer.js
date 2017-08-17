import React from 'react'
import P from 'prop-types'
import { DropTarget } from 'react-dnd'

import './DroppableContainer.css'
import DraggableItem from '../DraggableItem'

import { compose, setPropTypes } from 'recompose'

const DroppableContainer = props => {
  const { isOver, canDrop, connectDropTarget } = props
  const isActive = isOver && canDrop

  const filledClass = props.lastDroppedItem ? 'filled' : ''
  const activeClass = isActive ? 'active' : canDrop ? 'can-drop' : ''
  return connectDropTarget(
    <div>
      <div styleName="field-name">
        { props.label }{props.required ? '*' : ''}
      </div>
      <div styleName={ `droppable-container ${ filledClass } ${ activeClass }` }>
        {props.lastDroppedItem && <DraggableItem
          name={ props.lastDroppedItem.name }
          styleName="inlined-item"
          onRemove={ () => props.onRemove(props.lastDroppedItem) }/>}
      </div>
    </div>
  )
}

export default compose(
  setPropTypes({
    lastDroppedItem: P.object,
    label: P.string.isRequired,
    fieldKey: P.string.isRequired,
    onRemove: P.func,
    onDrop: P.func.isRequired
  }),
  DropTarget(() => 'any', {
    drop: ({ onDrop }, monitor) => onDrop(monitor.getItem())
  }, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(DroppableContainer)

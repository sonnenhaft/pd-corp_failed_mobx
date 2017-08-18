import React from 'react'
import P from 'prop-types'
import { DropTarget } from 'react-dnd'

import './DroppableContainer.css'
import DraggableItem from '../DraggableItem'

import { compose, setPropTypes } from 'recompose'

const DroppableContainer = props => {
  const { isOver, canDrop, connectDropTarget } = props
  const isActive = isOver && canDrop

  const filledClass = props.droppedItems.length && !props.multiple ? 'filled' : ''
  const activeClass = isActive ? 'active' : canDrop ? 'can-drop' : ''
  const multipleClass = props.multiple ? 'multiple' : ''
  const highlightError = props.required && props.showError && !props.droppedItems.length
  return connectDropTarget(
    <div styleName={ highlightError ? 'error' : '' }>
      <div styleName="field-name">
        { props.label }{props.required ? '*' : ''}
      </div>
      {props.subText && <div styleName="sub-text">{props.subText}</div>}
      <div styleName={ `droppable-container ${ filledClass } ${ activeClass } ${ multipleClass }` }>
        {props.droppedItems.map((item, index) => {
          return <DraggableItem
            key={ index }
            name={ item.name }
            styleName="inlined-item"
            onRemove={ () => props.onRemove(item) }/>
        })}
        {props.multiple && <div styleName="empty-space"/>}
      </div>
    </div>
  )
}

export default compose(
  setPropTypes({
    droppedItems: P.array.isRequired,
    multiple: P.bool.isRequired,
    required: P.bool,
    showError: P.bool,
    label: P.string.isRequired,
    // subText: P.string,
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

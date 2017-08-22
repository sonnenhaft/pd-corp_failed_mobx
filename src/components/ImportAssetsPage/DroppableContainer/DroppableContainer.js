import React from 'react'
import classnames from 'classnames'
import { compose, setPropTypes } from 'recompose'

import P from 'prop-types'
import { DropTarget } from 'react-dnd'

import './DroppableContainer.css'
import DraggableItem from '../DraggableItem'

const DroppableContainer = props => {
  const { isOver, canDrop, connectDropTarget, multiple } = props
  const active = isOver && canDrop

  const error = props.required && props.showError && !props.droppedItems.length
  return connectDropTarget(
    <div styleName={ classnames({ error }) }>
      <div styleName="field-name">
        { props.label }{props.required ? '*' : ''}
      </div>
      {props.subText && <div styleName="sub-text">{props.subText}</div>}
      <div styleName={ classnames('droppable-container', {
        filled: props.droppedItems.length && !multiple,
        'can-drop': canDrop && !active,
        multiple,
        active
      }) }>
        {props.droppedItems.map((item, index) => {
          return <DraggableItem
            key={ index }
            name={ item.name }
            styleName="inlined-item"
            onRemove={ () => props.onRemove(item) }/>
        })}
        {multiple && <div styleName="empty-space"/>}
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

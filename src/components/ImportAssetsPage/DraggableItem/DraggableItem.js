import React from 'react'
import P from 'prop-types'
import { DragSource } from 'react-dnd'
import { FontIcon } from 'react-toolbox'
import { compose, setPropTypes, withState } from 'recompose'

import './DraggableItem.css'

const DraggableItem = props => {
  const { isDragging, connectDragSource, name, dragging, onRemove, className } = props

  return connectDragSource(
    <div styleName={ `draggable-item ${ (isDragging ? 'isDragging' : dragging ? 'hoverDragging' : '') }` }
         className={ className }>
      <FontIcon value="menu" styleName="icon"/>
      <span styleName="text">{ name }</span>
      {onRemove && <FontIcon value="clear" onClick={ onRemove }/>}
    </div>
  )
}

export default compose(
  setPropTypes({
    name: P.string.isRequired,
    onRemove: P.func,
    className: P.string
  }),
  withState('dragging', 'setDragging', false),
  DragSource(() => 'any', {
    beginDrag: ({ setDragging, name }) => {
      setDragging(true)
      return { name }
    },
    endDrag: props => {
      props.setDragging(false)
      if ( props.onRemove ) {
        props.onRemove()
      }
    }
  }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(DraggableItem)

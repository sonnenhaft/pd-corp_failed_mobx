import React, { Component } from 'react'
import P from 'prop-types'
import { DragSource } from 'react-dnd'

import './DraggableItem.css'

@DragSource(() => 'any', {
  beginDrag: props => ({ name: props.name })
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class DraggableItem extends Component {
  static propTypes = {
    name: P.string.isRequired,
    isDropped: P.bool.isRequired
  }

  render() {
    const props = this.props
    const { isDragging, connectDragSource } = props

    return connectDragSource(
      <div styleName={`draggable-item ${isDragging ? 'isDragging' : ''}`}>
        {props.isDropped ? <s>{props.name}</s> : props.name }
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import './DroppableContainer.css'

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem())
  }
}

@DropTarget(() => 'any', dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired
  }

  render() {
    const props = this.props
    const { isOver, canDrop, connectDropTarget } = props
    const isActive = isOver && canDrop

    let backgroundColor = '#fff'
    if ( isActive ) {
      backgroundColor = 'darkgreen'
    } else if ( canDrop ) {
      backgroundColor = 'darkkhaki'
    }

    return connectDropTarget(
      <div>
        <div styleName="field-name">
          Field name:
        </div>
        <div style={{ backgroundColor }} styleName="droppable-container">
          {props.lastDroppedItem &&
          <p>{props.lastDroppedItem.name}</p>
          }
        </div>
      </div>
    )
  }
}

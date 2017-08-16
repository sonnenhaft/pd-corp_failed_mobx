import React, { Component } from 'react'
import update from 'react/lib/update'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './DroppableContainer'
import Box from './DraggableItem'

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dustbins: [
        { lastDroppedItem: null },
        { lastDroppedItem: null },
        { lastDroppedItem: null },
        { lastDroppedItem: null }
      ],
      boxes: [
        { name: 'Bottle1' },
        { name: 'Bottle2' },
        { name: 'Bottle3' },
        { name: 'Bottle4' }
      ],
      droppedBoxNames: []
    }
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1
  }

  render() {
    const { boxes, dustbins } = this.state

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ overflow: 'hidden', clear: 'both', display: 'flex', flexDirection: 'column', padding: '16px' }}>
          {boxes.map(({ name }, index) =>
            <Box
              name={name}
              type={'any'}
              isDropped={this.isDropped(name)}
              key={index}
            />
          )}
        </div>

        <div style={{ overflow: 'hidden', clear: 'both', display: 'flex', flexDirection: 'column' }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) =>
            <Dustbin
              accepts={accepts}
              lastDroppedItem={lastDroppedItem}
              onDrop={item => this.handleDrop(index, item)}
              key={index}
            />
          )}
        </div>
      </div>
    )
  }

  handleDrop(index, item) {
    const { name } = item

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item
          }
        }
      },
      droppedBoxNames: name ? {
        $push: [name]
      } : {}
    }))
  }
}

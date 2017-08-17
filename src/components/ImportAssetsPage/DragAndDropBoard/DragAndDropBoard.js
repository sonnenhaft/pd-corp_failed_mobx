import React from 'react'
import update from 'react/lib/update'
import { DragDropContext } from 'react-dnd'
import ReactDndHTML5Backend from 'react-dnd-html5-backend'
import { compose, withHandlers, withState } from 'recompose'
import DroppableContainer from '../DroppableContainer'
import DraggableItem from '../DraggableItem'

import './DragAndDropBoard.css'
import { Button, FontIcon } from 'react-toolbox'
import { NavLink } from 'react-router-dom'
import assets from 'mobx/Assets.store'
import { inject, observer } from 'mobx-react'
import XlsUploadInput from '../../XlsUploadInput'

const DragAndDropBoard = props => {
  const { boardState: { dbFields }, isDropped, handleDrop, handleRemove, fieldsFromTable } = props

  return (
    <div styleName="main-wrapper">
      <div>
        <div styleName="headerText">
          Imported Asset Name Fields
          <FontIcon value="info_outline" styleName="icon"/>
        </div>
        <div styleName="dragable-items">
          {fieldsFromTable.filter(({ name }) => !isDropped(name)).map(({ name }, index) =>
            <DraggableItem key={index} name={name}/>
          )}
        </div>
      </div>

      <div>
        <div styleName="headerText">
          SAT Asset Name Fields
          <FontIcon value="info_outline" styleName="icon"/>
        </div>
        <div styleName="dragable-items">
          <div styleName="droppable-wrapper">
            {dbFields.map((data, index) =>
              <div key={index}>
                <DroppableContainer
                  {...data}
                  onDrop={item => handleDrop(index, item)}
                  onRemove={item => handleRemove(index, item)}/>
              </div>
            )}
          </div>
        </div>
        <div>
          <br/>
          <div style={{display: 'inline-block'}}>
            <XlsUploadInput/>
          </div>
          &nbsp;
          &nbsp;
          <NavLink to="/assets">
            <Button raised>Cancel</Button>
          </NavLink>
          &nbsp;
          &nbsp;
          <Button raised primary>
            <FontIcon value="save"/>
            Save Asset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default compose(
  inject(() => ({
    fieldsFromTable: assets.getXlsxLabels().map(name => ({ name }))
  })),
  observer,
  DragDropContext(ReactDndHTML5Backend),
  withState('boardState', 'setBoxesState', {
    dbFields: assets.labels.filter(({ key }) => key !== 'id').map(({ label, key, required }) => {
      return { lastDroppedItem: null, label, fieldKey: key, required }
    }),
    droppedBoxNames: []
  }),
  withHandlers({
    isDropped: ({ boardState: { droppedBoxNames: b } }) => box => b.includes(box),
    handleRemove: ({ setBoxesState, boardState }) => (index, item) => {
      const { dbFields, droppedBoxNames } = boardState
      dbFields[index].lastDroppedItem = null
      droppedBoxNames.splice(droppedBoxNames.findIndex(({ name }) => name === item.name), 1)

      setBoxesState(boardState)
    },
    handleDrop: ({ setBoxesState, boardState }) => (index, item) => {
      const { name } = item

      setBoxesState(update(boardState, {
        dbFields: { [index]: { lastDroppedItem: { $set: item } } },
        droppedBoxNames: name ? { $push: [name] } : {}
      }))
    }
  })
)(DragAndDropBoard)

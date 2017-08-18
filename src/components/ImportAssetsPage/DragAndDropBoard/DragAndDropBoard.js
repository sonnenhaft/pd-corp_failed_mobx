import React from 'react'
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
import XlsUploadInput from '../XlsUploadInput'

const DragAndDropBoard = props => {
  const { boardState: { dbFields }, isDropped, handleDrop, handleRemove, fieldsFromTable, handleTouched, error } = props

  return (
    <div styleName="main-wrapper">
      <div>
        <div styleName="headerText">
          Imported Asset Name Fields
          <FontIcon value="info_outline" styleName="icon"/>
        </div>
        <div styleName="under-header-text">
          Please drag and drop each imported data field to the corresponding database profile field.
        </div>
        <div styleName="dragable-items">
          {fieldsFromTable.filter(({ name }) => !isDropped(name)).map(({ name }, index) =>
            <DraggableItem key={ index } name={ name }/>
          )}
        </div>
      </div>

      <div>
        <div styleName="headerText">
          DATABASE PROFILE
          <FontIcon value="info_outline" styleName="icon"/>
        </div>
        <div styleName="dragable-items">
          <div styleName="droppable-wrapper">
            {dbFields.map((data, index) =>
              <div key={ index } styleName={ data.multiple ? 'multiple' : '' }>
                <DroppableContainer
                  { ...data }
                  showError={ error }
                  onDrop={ item => handleDrop(index, item) }
                  onRemove={ item => handleRemove(index, item) }/>
              </div>
            )}
          </div>
        </div>
        <div>
          <br/>
          <div styleName={ `under-header-text ${ error ? 'error' : '' }` } style={ { display: 'inline-block' } }>
            * Indciates required field
          </div>
          <div style={ { display: 'inline-block' } }>
            <XlsUploadInput/>
          </div>
          &nbsp;
          &nbsp;
          <NavLink to="/assets">
            <Button raised>Cancel</Button>
          </NavLink>
          &nbsp;
          &nbsp;
          <Button raised primary onClick={ handleTouched } disabled={ error }>
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
  withState('error', 'setError', false),
  withState('boardState', 'setBoxesState', {
    dbFields: assets.labels.filter(({ key }) => key !== 'id').map(({ label, key, required }) => {
      const multiple = key === 'notes'
      const subText = multiple && 'Please drag and drop all other imported data fields to this field.'
      return { droppedItems: [], label, fieldKey: key, required, multiple, subText }
    }),
    droppedBoxNames: []
  }),
  withHandlers({
    handleTouched: ({ setError, error, boardState: { dbFields } }) => () => {
      const hasError = dbFields.some(({ required, droppedItems }) => {
        return required && !droppedItems.length
      })

      if ( error !== hasError ) {
        setError(hasError)
      }
    }
  }),
  withHandlers({
    isDropped: ({ boardState: { droppedBoxNames: b } }) => box => b.includes(box),
    handleRemove: ({ setBoxesState, boardState }) => (index, item) => {
      const { dbFields, droppedBoxNames } = boardState
      const items = dbFields[index].droppedItems
      items.splice(items.indexOf(item), 1)
      droppedBoxNames.splice(droppedBoxNames.findIndex(({ name }) => name === item.name), 1)

      setBoxesState(boardState)
    },

    handleDrop: ({ setBoxesState, boardState, error, handleTouched }) => (index, item) => {
      const { dbFields, droppedBoxNames } = boardState
      const dbField = dbFields[index]
      if ( !dbField.droppedItems.length || dbField.multiple ) {
        dbField.droppedItems.push(item)
        droppedBoxNames.push(item.name)
        setBoxesState(boardState)
        if ( error ) {
          handleTouched()
        }
      }
    }
  })
)(DragAndDropBoard)

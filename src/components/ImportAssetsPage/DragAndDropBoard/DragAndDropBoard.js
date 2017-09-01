import React from 'react'
import cn from 'classnames'
import { DragDropContext } from 'react-dnd'
import ReactDndHTML5Backend from 'react-dnd-html5-backend'
import { compose, withHandlers, withState } from 'recompose'
import DroppableContainer from '../DroppableContainer'
import DraggableItem from '../DraggableItem'
import { Tooltip } from 'common'
import { NavLink } from 'react-router-dom'
import './DragAndDropBoard.css'
import { Button, FontIcon } from 'react-toolbox'
import { mobxConnect, assets } from 'mobx-stores'

const DragAndDropBoard = props => {
  const { boardState: { dbFields }, isDropped, handleDrop, handleRemove, assets, handleTouched, error } = props

  return (
    <div>
      <div styleName="links-header">
        <NavLink to="/assets">Asset</NavLink>
        <div styleName="dot"/>
        <span>Import Assets</span>
      </div>
      <div styleName="main-wrapper">
        <div>
          <div styleName="headerText">
            Imported Asset Name Fields

            <Tooltip circle={ true } styleName="icon"
                     text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit diam sit amet nunc pretium, vel elementum tellus congue. Praesent ultrices varius varius. Phasellus placerat nulla non enim molestie accumsan eu a nibh. Morbi velit purus, vestibulum sed leo vitae, hendrerit imperdiet nisl."/>

          </div>
          <div styleName="under-header-text">
            Please drag and drop each imported data field to the corresponding database profile field.
          </div>
          <div styleName="dragable-items">
            {assets.getFieldsFromTable().filter(({ name }) => !isDropped(name)).map(({ name }, index) =>
              <DraggableItem key={ index } name={ name }/>
            )}
          </div>
        </div>

        <div>
          <div styleName="headerText">
            DATABASE PROFILE
            <Tooltip circle={ true } styleName="icon"
                     text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit diam sit amet nunc pretium, vel elementum tellus congue. Praesent ultrices varius varius. Phasellus placerat nulla non enim molestie accumsan eu a nibh. Morbi velit purus, vestibulum sed leo vitae, hendrerit imperdiet nisl."/>
          </div>
          <div styleName="dragable-items">
            <div styleName="droppable-wrapper">
              {dbFields.map((data, index) =>
                <div key={ index } styleName={ cn({ multiple: data.multiple }) }>
                  <DroppableContainer
                    { ...data }
                    showError={ error }
                    onDrop={ item => handleDrop(index, item) }
                    onRemove={ item => handleRemove(index, item) }/>
                </div>
              )}
            </div>
          </div>
          <br/>
          <div styleName="flexy">
            <div styleName="flexy vertical">
              <div styleName={ cn('under-header-text') }>
                * Indicates required field
              </div>
              {error && <div styleName={ cn('under-header-text', { error }) }>
                Invalid mapping. Data structure requires either Barcode
                Number or Asset Number to be mapped with an import data field.
                <br/>
                <br/>
                <br/>
                <br/>
              </div>}
            </div>

            <div style={ { whiteSpace: 'nowrap' } }>
              <NavLink to="/assets">
                <Button raised>Cancel</Button>
              </NavLink>
              &nbsp;
              &nbsp;
              <Button raised primary onClick={ handleTouched } disabled={ error }>
                <FontIcon value="save"/>
                Save
              </Button>
              &nbsp;
              &nbsp;
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getInitialBoard = () => ({
  dbFields: assets.labels.filter(item  => item.hasOwnProperty('importOrder')).sort((a, b) => {
    return a.importOrder > b.importOrder ? 1 : -1
  }).map(({ label, key, required }) => {
    const multiple = key === 'notes'
    const subText = multiple && 'Please drag and drop all other imported data fields to this field.'
    return { droppedItems: [], label, fieldKey: key, required, multiple, subText }
  }),
  droppedBoxNames: []
})

export default compose(
  mobxConnect('assets'),
  DragDropContext(ReactDndHTML5Backend),
  withState('error', 'setError', false),
  withState('boardState', 'setBoxesState', getInitialBoard),
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

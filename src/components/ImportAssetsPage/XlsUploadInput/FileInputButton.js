import React from 'react'
import { compose, setPropTypes, withHandlers, withState } from 'recompose'
import { Button } from 'react-toolbox'
import P from 'prop-types'

export const FileInputButton = compose(
  setPropTypes({
    accept: P.string.isRequired,
    children: P.oneOfType([
      P.element,
      P.array
    ]),
    className: P.string,
    onFileUploaded: P.func.isRequired,
    setMaxSizeError: P.func.isRequired
  }),
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    onClick: ({ inputRef }) => () => inputRef.click(),
    onChange: ({ setMaxSizeError, inputRef, maxSize, onFileUploaded }) => ({ target }) => {
      const file = target.files[0]

      if ( file.size > maxSize ) {
        setMaxSizeError(file)
        inputRef.value = null
      } else {
        onFileUploaded(file)
      }
    }
  })
)(props => {
  const { onClick, className, setInputRef, accept, onChange, children } = props
  return <Button raised { ...{ onClick, className } }>
    <input
      ref={ setInputRef }
      { ...{ accept, onChange } }
      type="file"
      style={ { display: 'none' } }/>
    {children}
  </Button>
})

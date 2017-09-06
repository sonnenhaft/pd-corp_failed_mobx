import React from 'react'
import { compose, setPropTypes, withHandlers, withState } from 'recompose'
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
    disabled: P.bool,
    setMaxSizeError: P.func.isRequired
  }),
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    onClick: ({ inputRef, disabled }) => () => !disabled && inputRef.click(),
    onChange: ({ setMaxSizeError, inputRef, maxSize, onFileUploaded }) => ({ target }) => {
      const file = target.files[0]

      if ( file.size > maxSize ) {
        setMaxSizeError(file)
      } else {
        onFileUploaded(file)
      }
      inputRef.value = null
    }
  })
)(props => {
  const { onClick, className, setInputRef, accept, onChange, children } = props
  return <div { ...{ onClick, className } }>
    <input
      ref={ setInputRef }
      { ...{ accept, onChange } }
      type="file"
      style={ { display: 'none' } }/>
    {children}
  </div>
})

/**
 * Purpose of this file is to share components from 'common' namespace.
 * So you don't need something like '../../common/Component" or even 'common/Component'
 * it would work if you do following:
 * @example import { Component } from 'common'
 *
 * Some common components are just widely used app wrapped react toolbox components
 * Some others are helpers and utils.
 * */
export { default as generateDemoTable, generateLine } from './generateDemoTable'
export { default as axios } from './axios'
export Dialog  from './Dialog'
export MenuButton  from './MenuButton'
export { PageHeader } from './PageHeader'
export { TextInput, TextInputWithIcon } from './TextInput'
export { RippleDiv } from './RippleDiv'
export { Tooltip } from './Tooltip'
export { IconButton, Icon }  from './Icon'
export { StringDatePicker }  from './StringDatePicker'
export { DeleteAssetsDialog }  from './DeleteAssetsDialog'
export { FileInputButton }  from './FileInputButton'

export const toFormData = (data = {}) => {
  return Object.keys(data).reduce((formData, key) => {
    formData.append(key, data[key])
    return formData
  }, new FormData())
}

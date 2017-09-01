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

export const toFormData = (data = {}) => {
  return Object.keys(data).reduce((formData, key) => {
    formData.append(key, data[key])
    return formData
  }, new FormData())
}

const reactToolboxVariables = {
  'color-primary': '#0077c8',
  'color-black': '#4a4a4a',
  'color-white': '#ffffff',
  'appbar-color': '#014990',
  'palette-blue-grey-50': '#f8f9fb',
  'color-primary-dark': '#004890',
  'button-height': 'calc(3.2 * var(--unit))',
  'preferred-font': '"Roboto", Times',
  'button-disabled-text-color': '#6c717b',
  'button-disabled-background-color': '#c5c9cb'
}

module.exports = {
  plugins: {
    // don't remove 'postcss-import' and don't move it to another place, necessary for react-toolbox
    'postcss-import': {},
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: reactToolboxVariables
        }
      }
    }
  }
}

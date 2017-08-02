const reactToolboxVariables = {
  'color-primary': '#0077c8',
  'color-black': '#4a4a4a',
  'button-height': 'calc(3.2 * var(--unit))',
  'preferred-font': '"HelveticaNeue", sans-serif',
  'checkbox-size': 'calc(0.8*1.8 * var(--unit))',
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

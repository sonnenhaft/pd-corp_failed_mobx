const generator = require('custom-template-generator');

generator({
  componentName: "asset",
  customTemplatesUrl: './templates/',
  dest: './src/redux',
  templateName: 'component',
  showPrompt: false,
  data: {
    NAME: 'ASSET',
  }
});


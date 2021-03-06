[![react][reactBadge]][react] [![webpack][webpackBadge]][webpack] [![ReactToolbox][rtBadge]][ReactToolbox] [![MobX][MobXbadge]][MobX] [![reactRouter][routerBadge]][reactRouter] [![node][nodeBadge]][node] [![npm][npmBadge]][npm] 

# PDC - FrontEnd (WEB)
Hi! You are reading ReadMe file of PDC FrontEnd project. It is a  web UI for PDC project. PDC itself should help doctors not to lose/forget the instruments in hospitals. PDC FrontEnd is an admin panel for working with database, for exporting old databases from old excel files (if any) and so on (typical custom admin panel).
Project is based on [![react][reactBadge]][react], es6 (with babel and [![webpack][webpackBadge]][webpack]), is using [![ReactToolbox][rtBadge]][ReactToolbox], [![MobX][MobXbadge]][MobX], and [![reactRouter][routerBadge]][reactRouter], and css modules.

#### Prerequisites
* [![node][nodeBadge]][node] or higher - (probably, in OS Win10 you'll need to restart system after installing node)
* [![npm][npmBadge]][npm] installed globally (done automatically with node everywhere except some linux distributives)
* port 8089 available on your machine (only for development)

#### Demo and versioning
Demo is [here][demo]. There are also [developer's latest demo][dev7] and [QA engineer’s demo][dev5] that are used for development needs. 
Each developer's commit app version bumps from (example) _0.0.11_ to _0.0.12_ (to one minor number) automatically.
After each release QA, or anybody who will deploy build, should bump 2nd number (example) _0.1.39_ to _0.2.0_ push this to master and then create git TAG from this commit.

#### First run
During first run and each time when you see "no dependency" errors please install all app dependencies via:
```sh
$ npm i
```
In the end of installing dependencies, you will see some warnings (react or fsevents or something else, depends on OS) - **ignore** this installation **warnings**.

#### Run locally
For running app in a way, how developers see it, to be able to extend codebase, please run:
```sh
$ npm run dev
```

#### Build
When you need to see build output (single or several minified js files and one index.html) you need to run:
```sh
$ npm run build
```
Sources will generated into `/dist` folder. This folder is added go .gitignore and should never being committed.

#### Assets as  XLS/XLSX/CSV samples
This FE app parses XLS/XLSX/CSV files, gets headers of table, allows to map this headers to our database layer and sends JSON to server. You can find file samples in directory "[import-samples](import-samples/)". 
#### Recompose and pure components, instead of "state"-full components
We are trying not to write components in class notation, but instead to use functional notation. Sample: 
``` JavaScript
import React from 'react'
import { compose, setPropTypes, withState } from 'recompose'

const MenuButton = ({ active, setActive, children, icon, className, ...props }) => <div>
  <button onClick={ () => setActive(!active) } { ...props } className={ className }>
Expand
  </Button>
  {active && <div>
    {children}
  </div>}
</div>

export default compose(
  withState('active', 'setActive', false)
)(MenuButton)
```
Note in the bottom "compose" and "withState". Yes, it works how you think. You can read more about recompose in its [official github][recompose]. Major benefit of doing this, except more rational state usage is ability quickly to wrap/extend/reuse component. Its usage is **strongly recommended** whenever possible.

#### MobX (equivalent of Redux) store [![MobX][MobXbadge]][MobX]
Instead of a Redux as a global storage, we use MobX, wish decrease number of boilerplate code and adds some magic using JavaScript getters and setters. Please, if you don't understand MobX usage from sources, read official documentation. 

There is one moment, that you may be confused with. Sometimes "observing" is not happening. Such cases are not described in MobX documentation, and you need to know them (or find new) by your own. In code of [EditAssetsPage](src/components/EditAssetPage/EditAssetPage.js) component you may find:
``` JavaScript
export default compose(
  observe(() => ({
    assets,
    active: assets.active,
    editableActiveAsset: assets.editableActiveAsset,
    previewImage: assets.previewImage
  })),
  ...
```
And by docs you should write:
``` JavaScript
export default compose(
  observe('assets'),
  ...
```
It is not working like in docs, because we made a mistake, writing assets tore, and made "asset" being map with unknown fields, any experiments with MobX custom extend function did not helped (may be you will be able to fix it). 

Also because of recompose specificity of methods like withProps, or withPropsOnChange, or possibly others, you will need to put MobX observer lower in compose arguments. See [PaginatableTable](src/components/AssetsPage/PaginatableTable/PaginatableTable.js) as example.

#### JS and CSS Style guides ([ESlint](.eslintrc.yaml), [CSSlint](.stylelintrc.yaml))
We do not have any specific style guide, but we have ESling config and CSSlint config, please run:
 run:
```sh
$ npm run lint:fix
```
**before** every **commit**. We are not adding this action to pre commit hooks like version bump, not to generate errors that may happen after automatic fixes (developer should do it manually). 
Some errors will not get fixed automatically, so you need to fix them manually in code. Please do not commit until you fix all the code style errors. Style linter is running with same command automatically right after ESlint. Please note that `npm run lint` does not exist in this package.json, so don't try to run it.


# Styling (css)
We use css-modules, so you can not easily write global styles in this project, be careful, try to avoid such cases.

#### Styling react components (styleName)
In react js if you write a class name on react component, you write `className="something"`, here we are importing styles from files, they are hashed, so you can do something like 
``` JavaScript
import styles from "./component-styles.css"
const Component = () => <div className={styles['component-style']}>
    ...
</div> 
```
**But better to** use babel-css-modules pseudo attribute `styleName` so our example would look like this:
``` JavaScript
import "./component-styles.css"
const Component = () => <div styleName="component-style">
    ...
</div> 
```
Please be careful, if style will not exist in css file, **app will get broken**. 
For cases when you need branching, if statements or kind of (like in AngularJS), please use [classnames][classnames] - it is a module-helper for working with strings.

#### CSS next
We don't use css preprocessors like SCSS/SASS or Stylus, but instead we use preprocessor for "CSS next" next standard of CSS. If you worked only with SCSS (or whatever else) you would enjoy this [article][sass-to-postcss-article], where you will find samples of variables, pseudo mixins, nesting and else.

#### Global styles
You should avoid writing global styles anywhere, but in cases, when you have to, for example because 3rd party library is not supporting css-modules, then use `:global`.

#### CSS, styles, Material Design, react-toolbox, overriding colors and styling
* We use react-toolbox as base components library for our react project, it is one of 2 open source react libraries that implement Material Design components.
* if not only styling is required to get overridden, we create a wrapper component and put it to [common](src/common/) folder
* You can update most of react-toolbox colors and other variables via updating "[postcss.config.js](postcss.config.js)".  Object in bottom of this file contains examples of how we override libraries colors.
* if you need just to update styling in react-toolbox component, find existing overrides in [here](src/App.js) 

[react]: <https://facebook.github.io/react/docs>
[reactBadge]: <http://img.shields.io/badge/react-v15.6.1-brightgreen.svg>
[webpack]: <https://webpack.js.org/configuration/>
[webpackBadge]: <http://img.shields.io/badge/webpack-v3.5.5-brightgreen.svg>
[ReactToolbox]: <http://react-toolbox.com/#/components>
[rtBadge]: <http://img.shields.io/badge/ReactToolbox-v2.0.0beta12-brightgreen.svg>
[MobX]: <https://mobx.js.org/intro/overview.html>
[mobxBadge]: <http://img.shields.io/badge/MobX-v3.2.2-brightgreen.svg>
[reactRouter]: <https://reacttraining.com/react-router/web/guides/philosophy>
[routerBadge]: <http://img.shields.io/badge/ReactRouterDom-v4.2.2-brightgreen.svg>
[node]: <https://nodejs.org/en/download/>
[nodeBadge]: <http://img.shields.io/badge/node-v6.10-brightgreen.svg>
[npm]: <https://nodejs.org/en/download/>
[npmBadge]: <http://img.shields.io/badge/npm-v3.10-brightgreen.svg>

[demo]: <https://demo-pdc-aws.isdev.info>
[dev5]: <https://dev5-pdc-aws.isdev.info>
[dev7]: <https://dev7-pdc-aws.isdev.info>
[recompose]: <https://github.com/acdlite/recompose>
[classnames]: <https://www.npmjs.com/package/classnames>
[sass-to-postcss-article]: <https://tylergaw.com/articles/sass-to-postcss>

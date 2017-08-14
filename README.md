## Prerequisites

* [node](https://nodejs.org/en/download/) >= 6.10.2 - need restart Win10 after install
* npm installed globally (done automatically with node everywhere except linux)
* port 8089 available on your machine

## Demo and versioning
https://demo-pdc-aws.isdev.info
Each developer's commit app version bumps from (example) 0.0.11 to 0.0.12 (to one minor number) automatically.
After each release QA, or anybody who will deploy build, should bump 2nd number (example) 0.1.39 to 0.2.0 push this to master and then create git TAG from this commit.

## First run
During first run and each time when you see "no dependency" errors please install all app dependencies via:
```sh
$ npm i
```
In the end of installing dependencies, you will see some warnings (react or fsevents or something else) - **ignore** this installation **warnings**.

## Run locally
For running app in a way, how developers see and extend it, please run:
```sh
$ npm run dev
```

## Run locally with webpack monitor
You can also run app in custom mode with webpack monitor where you can see some interesting stats related to bundles. 
```sh
$ npm run dev:dashboard
```

## EsLint
We use eslint with custom eslint config. To see errors and automatically to fix most of them please run:
```sh
$ npm run lint:fix
```
Please note that `npm run lint` does not exist in this package.json, so don't try to run it.

## Build
When you need to see build output (single or several minified js files and one index.html) you need to run:
```sh
$ npm run build
```

## Global UI colors
We use react-toolbox for common components. You can update most of global colors via updating "postcss.config.js".  Object in bottom of this file contains examples of how we override libraries colors.


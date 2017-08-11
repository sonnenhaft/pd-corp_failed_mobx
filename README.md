## Prerequisites

* [node](https://nodejs.org/en/download/) >= 6.10.2 - need restart Win10 after install
* npm installed globally (done automatically with node everywhere except linux)
* port 8089 available on your machine

## Demo (last released tag)
https://demo-pdc-aws.isdev.info

## First run
During first run and each time when you see "no dependency" errors please install all app dependencies via:
```sh
$ npm i
```

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

## Run locally in production mode
It is planned that we will have some specific variables related to production. When you need to use them but in dev view (for rapid development) run:
```sh
$ npm run dev:prod
```
PS: not used at this point.

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

## Build to use dev env variables
Sometimes you need to run build but to use some dev specific variables (for example for API proxing), then you may run:
```sh
$ npm run build:dev
```
## Versioning politics 
Each developer's commit app version bumps from (example) 0.0.11 to 0.0.12 (to one minor number) automatically.
After each release QA, or anybody who will deploy build, should bump 2nd number (example) 0.1.39 to 0.2.0 push this to master and then create git TAG from this commit.

## Global UI colors
We use react-toolbox for common components. You can update most of global colors via updating "postcss.config.js".  Object in bottom of this file contains examples of how we override libraries colors.


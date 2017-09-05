/**
 * Here and everywhere - major purpose of such index.js files is
 * to be able to import package by directory name, so we don't do
 * import common from 'common/index' or from
 * import common from 'common/common' we just DO instead
 * import common from 'common' or
 * import { SomeSpecificFunc } from 'common'
 */
export * from './common'

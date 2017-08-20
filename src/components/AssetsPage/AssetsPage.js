import React from 'react'

import AssetsPageHeader from './AssetsPageHeader'
import SearchInputs from './SearchInputs'
import PaginatableTable from './PaginatableTable'

import './AssetsPage.css'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

const AssetsPage = ({ assets: { list: data, labels } }) => <div>
  <AssetsPageHeader/>
  <div styleName="assets-page-content">
    <SearchInputs/>
    <PaginatableTable { ...{ labels, data } }/>
  </div>
</div>

export default compose(
  inject('assets'),
  observer
)(AssetsPage)

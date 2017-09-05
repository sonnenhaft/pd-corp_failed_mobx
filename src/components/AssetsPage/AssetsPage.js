import React from 'react'
import { mobxConnect } from 'mobx-stores'

import AssetsPageHeader from './AssetsPageHeader'
import SearchInputs from './SearchInputs'
import PaginatableTable from './PaginatableTable'

import './AssetsPage.css'

const AssetsPage = ({ assets: { list: data, labels } }) => <div>
  <AssetsPageHeader/>
  <div styleName="assets-page-content">
    <SearchInputs/>
    <PaginatableTable { ...{ labels, data } }/>
  </div>
</div>

export default mobxConnect('assets')(AssetsPage)

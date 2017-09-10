import React from 'react'
import AssetsPageHeader from './AssetsPageHeader'
import SearchInputs from './SearchInputs'
import PaginatableTable from './PaginatableTable'

import './AssetsPage.css'

export default function AssetsPage() {
  return <div>
    <AssetsPageHeader/>
    <div styleName="assets-page-content">
      <SearchInputs/>
      <PaginatableTable/>
    </div>
  </div>
}

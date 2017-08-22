import React from 'react'

import ImportAssetsPageHeader from './ImportAssetsPageHeader'
import DragAndDropBoard from './DragAndDropBoard'

import './ImportAssetsPage.css'

const AssetsPage = () => <div>
  <ImportAssetsPageHeader/>
  <div styleName="assets-page-content">
    <DragAndDropBoard/>
  </div>
</div>

export default AssetsPage

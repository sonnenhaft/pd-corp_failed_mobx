import React from 'react'

import ImportAssetsPageHeader from './ImportAssetsPageHeader'
import FieldsDragAndDrop from './FieldsDragAndDrop/DragAndDropBoard'

import './ImportAssetsPage.css'

const AssetsPage = () => <div>
  <ImportAssetsPageHeader/>
  <div styleName="assets-page-content">
    <FieldsDragAndDrop/>
  </div>
</div>

export default AssetsPage

import React from 'react'

import ImportAssetsPageHeader from './ImportAssetsPageHeader'
import DragAndDropBoard from './DragAndDropBoard'
import XlsUploadInput from '../XlsUploadInput'

import './ImportAssetsPage.css'

const AssetsPage = () => <div>
  <ImportAssetsPageHeader/>
  <div styleName="assets-page-content">
    <XlsUploadInput/>
    <DragAndDropBoard/>
  </div>
</div>

export default AssetsPage

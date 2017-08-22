import React from 'react'
import Button from 'react-toolbox/lib/button'
import { NavLink } from 'react-router-dom'

import { Icon, PageHeader } from 'common'
import createAssetSvg from './create-asset.icon.svg'
import exportReportSvg from './export-report.icon.svg'
import importAssetsSvg from './import-assets.icon.svg'
import './AssetsPageHeader.css'

import XlsUploadInput from '../../ImportAssetsPage/XlsUploadInput'

const AssetsPageHeader = () => <PageHeader>
  <div styleName="header-text">ASSETS</div>
  <div>
    <NavLink to={ '/assets/create' }>
      <Button raised>
        <Icon svg={ createAssetSvg }/>
        Create Asset
      </Button>
    </NavLink>

    <XlsUploadInput styleName="middle-button">
      <Icon svg={ importAssetsSvg }/>
      Import Assets
    </XlsUploadInput>

    <Button raised onClick={ () => alert('define export report action') }>
      <Icon svg={ exportReportSvg }/>
      Export Report
    </Button>
  </div>
</PageHeader>

export default AssetsPageHeader

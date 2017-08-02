import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Card } from 'react-toolbox'

import AssetsPageHeader from './EditAssetPageHeader'

import './EditAssetPage.css'

const EditAssetPage = () => {
  return <div>
    <AssetsPageHeader/>
    <div styleName="page-wrapper">
      <Card>
        <div>Assets > ALARIS ETCO2 MODULES</div>
      </Card>
      <Card>
        <div styleName="edit-asset-page-content">
          <div>
            <img src="http://lorempixel.com/283/365"/>
          </div>
          <div>
            <div>Header</div>
            <div>Fields</div>
            <div>Notes</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
}

export default compose(
  connect(({ user }) => ({ user }))
)(EditAssetPage)

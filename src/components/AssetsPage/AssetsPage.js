import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import AssetsPageHeader from './AssetsPageHeader'

import {
  Card,
  CardText
} from 'material-ui/Card'

import './AssetsPage.scss'

const AssetsPage = () => {
  return <div>
    <AssetsPageHeader/>
    <Card styleName="page-wrapper">
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
    </Card>
  </div>
}

export default compose(
  connect(({ user }) => ({ user }))
)(AssetsPage)

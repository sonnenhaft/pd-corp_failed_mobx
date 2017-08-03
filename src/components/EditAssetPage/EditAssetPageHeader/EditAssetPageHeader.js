import React from 'react'
import { compose, withState } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'

import { Icon, PageHeader } from 'common'
import './EditAssetPageHeader.css'
import { Button, FontIcon } from 'react-toolbox'

const BackBtn = ({ children, to = '/assets', ...props }) => <NavLink to={to}>
  <Button {...props}>
    {children}
  </Button>
</NavLink>

const CancelButton = ({ to }) => <BackBtn to={to} styleName="cancel-button">
  Cancel
</BackBtn>

const SaveButton = () => <Button
  raised
  onClick={() => alert('define Save action')}
  styleName="middle-button">
  <FontIcon value="save"/>
  Save Asset
</Button>

const EditAssetsPageHeader = ({ hoveredIndex, setHoveredIndex, location, match }) => <PageHeader>
  <div styleName="header-text">
    <BackBtn raised styleName="back-link">
      <FontIcon value="chevron_left"/>
    </BackBtn>
    <Route path="/assets/edit/:assetId" component={() => <span>UPDATE ASSET</span>}/>
    <Route path="/assets/view/:assetId" component={() => <span>TODO: asset name in here</span>}/>
    <Route path="/assets/create" component={() => <span>CREATE ASSET</span>}/>
  </div>
  <div styleName="buttons-block">
    <Route path="/assets/view/:assetId" component={({ match: { params: { assetId } } }) => ( <NavLink to={`/assets/edit/${assetId}`} replace onClick={e => {
        console.log(hoveredIndex, location, match)
        setHoveredIndex(hoveredIndex + 1)
      }}>
        <Button raised>
          <FontIcon value="update"/>Update Asset
        </Button>
      </NavLink>
    )}/>

    <Route path="/assets/view/:assetId" component={() => (
      <Button raised onClick={() => alert('TODO: define delete')}>
        <FontIcon value="delete"/>Delete Asset
      </Button>
    )}/>

    <Route path="/assets/create" component={CancelButton}/>
    <Route path="/assets/create" component={SaveButton}/>

    <Route path="/assets/edit/:assetId" component={({ match: { params: { assetId } } }) => {
      return <CancelButton to={`/assets/view/${assetId}`}/>
    }}/>
    <Route path="/assets/edit/:assetId" component={SaveButton}/>

  </div>
</PageHeader>

export default compose(
  withState('hoveredIndex', 'setHoveredIndex', -1),
  withRouter,

)(EditAssetsPageHeader)

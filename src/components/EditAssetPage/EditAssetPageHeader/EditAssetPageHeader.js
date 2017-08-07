import React from 'react'
import { compose, withProps, withState } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'

import { PageHeader } from 'common'
import './EditAssetPageHeader.css'
import { Button, FontIcon } from 'react-toolbox'
import DeleteDialog from '../../AssetsPage/PaginatableTable/DeleteDialog'
import assets from 'mobx/Assets.store'
import { inject, observer } from 'mobx-react'

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

const EditAssetsPageHeader = ({
                                hoveredIndex, setHoveredIndex, location,
                                match: { params: { assetId } },
                                history,
                                activeItem = {},
                                assets
                              }) => (
  <PageHeader>
    <div styleName="header-text">
      <BackBtn raised styleName="back-link">
        <FontIcon value="chevron_left"/>
      </BackBtn>
      <Route path="/assets/edit/:assetId" component={() => <span>UPDATE ASSET</span>}/>
      <Route path="/assets/view/:assetId" component={() => <span>{activeItem.asset_name}</span>}/>
      <Route path="/assets/create" component={() => <span>CREATE ASSET</span>}/>
    </div>
    <div styleName="buttons-block">
      <Route path="/assets/view/:assetId"
             component={() => ( <NavLink to={`/assets/edit/${assetId}`} replace onClick={() => setHoveredIndex(hoveredIndex + 1)}>
                 <Button raised>
                   <FontIcon value="update"/>Update Asset
                 </Button>
               </NavLink>
             )}/>

      <Route path="/assets/view/:assetId" component={() => (
        <DeleteDialog action={() => {
          assets.remove(assetId)
          history.push(`${location.pathname}/view/${assetId}`)
        }} type="asset">
          <Button raised>
            <FontIcon value="delete"/>Delete Asset
          </Button>
        </DeleteDialog>
      )}/>

      <Route path="/assets/create" component={CancelButton}/>
      <Route path="/assets/create" component={SaveButton}/>

      <Route path="/assets/edit/:assetId" component={() => {
        return <CancelButton to={`/assets/view/${assetId}`}/>
      }}/>
      <Route path="/assets/edit/:assetId" component={SaveButton}/>

    </div>
  </PageHeader>)

export default compose(
  withRouter,
  withState('hoveredIndex', 'setHoveredIndex', -1),
  inject(() => ({ assets })),
  observer,
  withProps(({ assets }) => ({ activeItem: assets.active }))
)(EditAssetsPageHeader)

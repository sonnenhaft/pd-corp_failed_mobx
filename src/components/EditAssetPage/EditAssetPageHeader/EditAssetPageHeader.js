import React from 'react'
import { compose, withProps, withState } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'

import { PageHeader } from 'common'
import './EditAssetPageHeader.css'
import { Button, FontIcon } from 'react-toolbox'
import { deleteAssetSuccess } from 'redux/asset.actions'
import { connect } from 'react-redux'
import DeleteDialog from '../../AssetsPage/PaginatableTable/DeleteDialog'

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
                                deleteAsset, history,
                                activeItem = {}
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
          deleteAsset(assetId)
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
  withState('hoveredIndex', 'setHoveredIndex', -1),
  connect(
    ({ user, assets: { list, activeId } }) => ({ user, list, activeId }),
    { deleteAsset: deleteAssetSuccess }
  ),
  withRouter,
  withProps(({ list, activeId }) => {
    const activeItem = list.find(({id}) => id === activeId)
    return { activeItem }
  })
)(EditAssetsPageHeader)

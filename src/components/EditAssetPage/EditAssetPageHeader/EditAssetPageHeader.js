import React from 'react'
import { compose, withProps, withState } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'
import { Button, FontIcon } from 'react-toolbox'
import { inject, observer } from 'mobx-react'

import DeleteDialog from '../../AssetsPage/PaginatableTable/DeleteDialog'
import { PageHeader } from 'common'
import './EditAssetPageHeader.css'

const BackBtn = ({ children, to = '/assets', ...props }) => <NavLink to={ to }>
  <Button { ...props }>
    {children}
  </Button>
</NavLink>

const EditAssetsPageHeader = props => {
  const {
    hoveredIndex, setHoveredIndex, location,
    match: { params: { assetId } },
    activeItem = {}
  } = props

  const { assets, routing } = props

  const isView = location.pathname.includes('view')

  return <PageHeader>
    <div styleName="header-text">
      <BackBtn raised styleName="back-link">
        <FontIcon value="chevron_left"/>
      </BackBtn>
      <Route path="/assets/edit/:assetId" component={ () => <span>UPDATE ASSET</span> }/>
      <Route path="/assets/view/:assetId" component={ () => <span title={ activeItem.assetName }>{activeItem.assetName}</span> }/>
      <Route path="/assets/create" component={ () => <span>CREATE ASSET</span> }/>
    </div>
    <div styleName="buttons-block">
      {!isView && <Button onClick={ () => assets.setRandomForActive() } raised>
        SET RANDOM DATA
      </Button>}
      <Route path="/assets/view/:assetId"
             component={ () => ( <NavLink to={ `/assets/edit/${ assetId }` } replace onClick={ () => setHoveredIndex(hoveredIndex + 1) }>
                 <Button raised>
                   <FontIcon value="update"/>Update Asset
                 </Button>
               </NavLink>
             ) }/>

      <Route path="/assets/view/:assetId" component={ () => (

        <DeleteDialog
          action={ () => assets.remove(assets.active.id).then(() => {
            routing.push(`${ location.pathname }/view/${ assetId }`)
          })}
          text="Are you sure you want to delete this asset?"
          title="Delete Asset">

          <Button raised>
            <FontIcon value="delete"/>Delete Asset
          </Button>
        </DeleteDialog>
      ) }/>

    </div>
  </PageHeader>
}

export default compose(
  withRouter,
  withState('hoveredIndex', 'setHoveredIndex', -1),
  inject('assets', 'routing'),
  observer,
  withProps(({ assets }) => ({ activeItem: assets.active }))
)(EditAssetsPageHeader)

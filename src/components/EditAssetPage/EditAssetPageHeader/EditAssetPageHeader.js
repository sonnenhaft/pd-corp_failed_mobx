import React from 'react'
import { compose, withProps, withState } from 'recompose'
import { NavLink, Route, withRouter } from 'react-router-dom'
import { Button, FontIcon } from 'react-toolbox'
import { mobxConnect } from 'mobx-stores'
import { DeleteAssetsDialog, PageHeader } from 'common'
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
    editableActiveAsset = {}
  } = props

  const { assets, routing } = props

  const isView = location.pathname.includes('view')

  return <PageHeader>
    <div styleName="header-text">
      <BackBtn raised styleName="back-link">
        <FontIcon value="chevron_left"/>
      </BackBtn>
      <Route path="/assets/edit/:assetId" component={ () => <span>UPDATE ASSET</span> }/>
      <Route path="/assets/view/:assetId" component={ () => <span title={ editableActiveAsset.assetName }>{editableActiveAsset.assetName}</span> }/>
      <Route path="/assets/create" component={ () => <span>CREATE ASSET</span> }/>
    </div>
    <div styleName="buttons-block">
      {!isView && <Button onClick={ () => assets.fillActiveAssetWithRandom() } raised>
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

        <DeleteAssetsDialog action={ () => assets.remove(assets.active.id).then(() => {
          routing.push(`${ location.pathname }/view/${ assetId }`)
        }) }>

          <Button raised>
            <FontIcon value="delete"/>Delete Asset
          </Button>
        </DeleteAssetsDialog>
      ) }/>

    </div>
  </PageHeader>
}

export default compose(
  withRouter,
  withState('hoveredIndex', 'setHoveredIndex', -1),
  mobxConnect('assets', 'routing'),
  withProps(({ assets }) => ({ editableActiveAsset: assets.active }))
)(EditAssetsPageHeader)

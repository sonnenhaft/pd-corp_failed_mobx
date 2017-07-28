import React from 'react'

import './SearchInputs.scss'
import { Button, DropDown, TextInput } from 'utils'
import { DatePicker } from 'material-ui'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const SearchInputs = () => <Card styleName="search-inputs-card">
  <CardHeader title="SEARCH"
              actAsExpander={true}
              showExpandableButton={true}/>
  <CardText expandable={true}>
    <TextInput hintText="Search"/>
    <div styleName="search-input-buttons">
      <DropDown placeholder="Asset Type"/>
      <DropDown placeholder="Model Name"/>
      <DropDown placeholder="Key Location Name"/>
      <DropDown placeholder="Manufacturer"/>
      <DropDown placeholder="Status"/>
      <div styleName="date-inputs">
        <div>
          <DatePicker hintText="Last Update Date from"/>
        </div>
        <div>
          <DatePicker hintText="Last Update Date to"/>
        </div>
      </div>
    </div>
    <div styleName="search-button-wrapper">
      <Button primary={true}>SEARCH</Button>
    </div>
  </CardText>
</Card>

export default SearchInputs

import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

const CustomTable = ({ labels, data, isSelectable = true, children, setSelectedIndexes, sort, setSort }) => {

  return <Table
    fixedHeader={false}
    fixedFooter={false}
    selectable={isSelectable}
    onRowSelection={setSelectedIndexes}
    multiSelectable={isSelectable}>
    <TableHeader
      displaySelectAll={isSelectable}
      adjustForCheckbox={isSelectable}
      enableSelectAll={isSelectable}>
      <TableRow>
        {labels.map(({ label, key }) => {
          return <TableHeaderColumn key={key}>
            {setSort && <div onClick={() => setSort(key)}>
              {label}
              <span>
                &nbsp;
                {sort && sort.key === key && (sort.asc ? 'asc' : 'desc')}
              </span>
            </div>}
            {!setSort && label}
          </TableHeaderColumn>
        })}
      </TableRow>
    </TableHeader>
    <TableBody stripedRows={true}
               displayRowCheckbox={isSelectable}
               preScanRows={false}
               deselectOnClickaway={false}
               showRowHover={true}>
      {data.map((row, index) => (
        <TableRow key={index}>
          {labels.map(({ key }) => {
            return <TableRowColumn key={key}>
              {children ? children({ index, row, key }) : row[key]}
            </TableRowColumn>
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>

}
export default CustomTable

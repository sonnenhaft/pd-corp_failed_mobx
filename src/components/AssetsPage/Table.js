import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'


const CustomTable = ({labels, data}) => <Table>
  <TableHeader fixedHeader={false}>
    <TableRow>
      {labels.map(({ label, key }) => {
        return <TableHeaderColumn key={key}>
          {label}
        </TableHeaderColumn>
      })}
    </TableRow>
  </TableHeader>
  <TableBody stripedRows={true}>
    {data.map((row, index) => (
      <TableRow key={index}>
        {labels.map(({ key }) => {
          return <TableRowColumn key={key}>
            {row[key]}
          </TableRowColumn>
        })}
      </TableRow>
    ))}
  </TableBody>
</Table>

export default CustomTable

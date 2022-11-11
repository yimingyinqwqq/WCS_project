import React from 'react'
import { Header, Table, Rating } from 'semantic-ui-react'

const TableExamplePadded = () => (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>CouseName</Table.HeaderCell>
          <Table.HeaderCell>MeetingTime</Table.HeaderCell>
          <Table.HeaderCell>Professor</Table.HeaderCell>
          <Table.HeaderCell>Location</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
        <Table.Row>

          <Table.Cell>
            <Header as='h2' textAlign='center'>
             CS124
            </Header>
          </Table.Cell>

          <Table.Cell singleLine> 09:00 - 09:50</Table.Cell>

          <Table.Cell singleLine> Geoffrey Werner Challen</Table.Cell>

          <Table.Cell singleLine> 0403 Siebel Center for Comp Sci </Table.Cell>

        </Table.Row>

        <Table.Row>

        <Table.Cell>
            <Header as='h2' textAlign='center'>
            CS128
            </Header>
        </Table.Cell>

        <Table.Cell singleLine> 09:00 - 10:20 </Table.Cell>

<       Table.Cell singleLine> 	Michael Nowak </Table.Cell>

<       Table.Cell singleLine> 4031 Campus Instructional Facility  </Table.Cell>

        </Table.Row>    

        <Table.Row>

        <Table.Cell>
            <Header as='h2' textAlign='center'>
            CS225
            </Header>
        </Table.Cell>

        <Table.Cell singleLine> 11:00 - 11:50 </Table.Cell>

        <Table.Cell singleLine> Carl Evans </Table.Cell>

        < Table.Cell singleLine> 1002 Electrical and Computer Eng Bldg   </Table.Cell>

        </Table.Row>

      </Table.Body>
    </Table>
  )

  export default TableExamplePadded

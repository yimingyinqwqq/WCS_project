import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './course_temp.json'
import { COLUMNS } from './columns'
import { Button } from 'semantic-ui-react'
import { Header, Table} from 'semantic-ui-react'

import Popup from './Popup';

import './table.css'
import './Classmate.css'

const HelpSchedule = ({AddCourse}) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const initialState = { hiddenColumns: ['Student', 'Num'] };
  // const [Classmate, setClassmate] = useState(columns);

  const [isOpen, setIsOpen] = useState(false);
  const [courseNumber, setCourseNumber] = useState("no class");
  const [courseTitle, setCourseTitle] = useState("no class");
  const [CRN, setCRN] = useState("no class");
  const [Type, setType] = useState("no class");
  const [Section, setSection] = useState("no class");
  const [Time, setTime] = useState("no class");
  const [Day, setDay] = useState("no class");
  const [Location, setLocation] = useState("no class");
  const [Instructor, setInstructor] = useState("no class");
  
  const togglePopup = (courseNumber, courseTitle, CRN, Type, Section, Time, Day, Location, Instructor, Num) => {
    setIsOpen(!isOpen);
    setCourseNumber(courseNumber);
    setCourseTitle(courseTitle);
    setCRN(CRN);
    setType(Type);
    setSection(Section);
    setTime(Time);
    setDay(Day);
    setLocation(Location);
    setInstructor(Instructor);
    console.log(courseNumber);

    AddCourse(Num);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
    initialState
  })

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{
                  column.render("Header")
                }
                </th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                <div className='P_classmate'>
                <Button color="blue"
                        onClick={() => {togglePopup(row.values.Dep, row.values.Name, row.values.CRN, row.values.Type, 
                          row.values.Section, row.values.Time, row.values.Day, row.values.Location, row.values.Instructor, row.values.Num)}}>
                  Add
                </Button>
                </div>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

{/* 
      <div>
      {isOpen && <Popup
        content={<>
          <p>Your classmates are: </p>
          <p>{idata}</p>
        </>}
        handleClose={togglePopup}
      />}
      </div> */}

      <div> 
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>CourseNumber</Table.HeaderCell>
            <Table.HeaderCell>Course Title</Table.HeaderCell>
            <Table.HeaderCell>CRN</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Section</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Day</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Instructor</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body> 
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            {courseNumber}
          </Header>
        </Table.Cell>
        <Table.Cell>{courseTitle}</Table.Cell>
        <Table.Cell>{CRN}</Table.Cell>
        <Table.Cell>{Type} </Table.Cell>
        <Table.Cell>{Section}</Table.Cell>
        <Table.Cell>{Time}</Table.Cell>
        <Table.Cell>{Day}</Table.Cell>
        <Table.Cell>{Location}</Table.Cell>
        <Table.Cell>{Instructor}</Table.Cell>
      </Table.Row>

      </Table.Body>
      </Table>
          
      </div>
    </>
  )
}

export default HelpSchedule
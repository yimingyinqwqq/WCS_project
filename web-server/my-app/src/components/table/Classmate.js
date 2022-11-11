import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './course_temp.json'
import { COLUMNS } from './columns'
import { Button } from 'semantic-ui-react'

import Popup from './Popup';

import './table.css'
import './Classmate.css'

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const initialState = { hiddenColumns: ['Student', 'Num'] };
  // const [Classmate, setClassmate] = useState(columns);

  const [isOpen, setIsOpen] = useState(false);
  const [idata, setData] = useState("no class");
  const togglePopup = (datas) => {
    setIsOpen(!isOpen);
    setData(datas);
    console.log(datas)
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
                        onClick={() => {togglePopup(row.values.Student)}}>
                  View
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


      <div>
      {isOpen && <Popup
        content={<>
          <p> People who take this class: </p>
          <div> {idata.split(",").map((name) => <p> {name.toString()} </p>)} </div>
        </>}
        handleClose={togglePopup}
      />}
      </div>
    </>
  )
}

export default BasicTable
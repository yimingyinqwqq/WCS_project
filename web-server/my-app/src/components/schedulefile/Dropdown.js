import { useMemo, useState, useEffect } from "react";  
import React from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

const MAX_COURSES_SELECTION = 5;

const courseOptions = [
  { key: 'cs124', text: 'CS 124 (Introduction to Computer Science I)', value: 'CS 124 ' },
  { key: 'cs128', text: 'CS 128 (Introduction to Computer Science II)', value: 'CS 128 ' },
  { key: 'cs225', text: 'CS 225 (Data Structures)', value: 'CS 225 ' },
  { key: 'cs233', text: 'CS 233 (Computer Architecture)', value: 'CS 233 ' },
  { key: 'cs241', text: 'CS 241 (System Programming)', value: 'CS 241 ' },
  { key: 'cs357', text: 'CS 357 (Numerical Methods I)', value: 'CS 357 ' },
  { key: 'cs361', text: 'CS 361 (Probability & Statistics for Computer Science)', value: 'CS 361 ' },
  
]

const DropdownCourseList = () => {
    const [courseName, setCourseName] = useState('non-select');
    const [clicked, setClicked] = useState(true);
    const dropdownHandleSelect = (e, {value}) => {
      if (value.length <= MAX_COURSES_SELECTION) {
        setCourseName(value);
      } else {
        <p> You cannot not add more than 5 courses! </p>
      }
      // console.log(value);
    }

    const buttonHandleSelect = (e, {click}) => {
      setClicked(click);
      // console.log(value);
    }

    const callBackMethod = () =>{
      this.props.sendData(courseName);
    } 


    // useEffect(() => {
    //   document.title = `You clicked ${value} times`;
    // });
    return (
      <div>
        <h3> You clicked {courseName} </h3>
      
        <Dropdown
          placeholder='Select Courses'
          search
          multiple
          fluid
          selection
          //allowAdditions
          additionLabel='input your course: '
          value={courseName}
          onChange={dropdownHandleSelect}
          options={courseOptions}
        />

        
        {/* <Button
          circular 
          icon="find"
          content='Find!' 
          color="pink"
          onClick={buttonHandleSelect}
        /> */}
      
      </div>

    );
}

export default DropdownCourseList

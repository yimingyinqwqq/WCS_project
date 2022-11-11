import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {useState} from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Button, Input, Icon } from "semantic-ui-react"
import "./Calendar.css"

const locales = {
    "en-US": require("date-fns/locale/en-US")   
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "CS225",
        allDay: true,
        start: new Date(2022,4,21),
        end: new Date(2022,4,21)
    },
    {
        title: "CS233",
        allDay: true,
        start: new Date(2022,4,22),
        end: new Date(2022,4,22)
    },
    {
        title: "CS357",
        allDay: true,
        start: new Date(2022,4,23),
        end: new Date(2022,4,23)
    },
]

const courseCalandar = () => {
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(events)

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    return (
        <div className="container_calendar">
          <div className="P_calendar"> Course Calandar </div>
          <div>
         

            <Input
                icon = {<Icon name='search' inverted circular link />}
                // style = {{width: "20%", marginRight: "10px"}}
                placeholder = 'input courses...'
                value = {newEvent.title}
                onChange = {(e) => setNewEvent({...newEvent, title: e.target.value})}
            />

            <DatePicker placeholderText = "Start Date" style ={{marginRight: "10px"}}
             selected = {newEvent.start} onChange = {(start) => setNewEvent({...newEvent, start: start})} 
             wrapperClassName="datePicker"
            />
            <DatePicker placeholderText = "End Date" 
             selected = {newEvent.end} onChange = {(end) => setNewEvent({...newEvent, end: end})} 
             wrapperClassName="datePicker"
            />
             <Button style = {{marginTop : "10px"}} onClick = {handleAddEvent}>
                 Add Course
             </Button>
          </div> 
          <Calendar localizer = {localizer} 
           events = {allEvents} 
           startAccessor = "start" 
           endAccessor = "end" 
           style = {{height : 500, margin: "50px"}} 
           />
        </div>
    );
}

export default courseCalandar

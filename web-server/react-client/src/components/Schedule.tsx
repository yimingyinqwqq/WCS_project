import React, { useState } from "react";
import httpClient from "./utility/httpClient";
import { Button } from 'semantic-ui-react'
import { Navigate } from "react-router-dom";
import HelpSchedule from "./table/helpSchedule";

import "./Schedule.css"

const Schedule: React.FC = () => {
    const [dep, Course] = useState<string>("");
    const [id, setid] = useState<string>("");
    const [cid, setcid] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [cemail, setcemail] = useState<string>("");
    const handleClick = () => {
        setcid(id);
        setcemail(email);
        console.log(cid);
    }
    const FindCourse = async () => {
        console.log(dep);
        try {
            const resp = await httpClient.post("//localhost:5000/schedule", {
              dep,
            });
            console.log(resp.data);
        } catch (error : any){
            if (error.response.status === 401) {
              alert("Invalid credentials");
            }
        }  
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const AddCourse = async (data: any) => {
        console.log(data);
        try {
            const resp = await httpClient.post("//localhost:5000/add", {
              data,cid,cemail
            });
            // console.log(resp.data);
        } catch (error: any) {
            if (error.response.status === 401) {
              alert("Invalid credentials");
            }
        }  
    }
    
    const out = (cid == "" || cemail == "")? (
        <div className="P_finder">
        <form>
        <div>Enter your account(name/email):</div>
        <input
            type = "text"
            value = {id}
            placeholder = "name"
            onChange={(e) => setid(e.target.value)}
            id = ""/>
        <input
            type = "text"
            value = {email}
            placeholder = "email"
            onChange={(e) => setemail(e.target.value)}
            id = ""/>
        <Button onClick={() => handleClick()}>Confirm</Button>
    </form></div>
    ) : (
        <div className="content_schedule">
        <div className="P_schedule">
        <div>Your name: {cid}</div>
        <div>Your email: {cemail}</div>
            <form onSubmit={handleSubmit}>
                <div className='P_schedule'> You can add your courses in this page!</div>
                <label className='P_schedule'> Type the Course Name (e.g. CS124): </label>
                    <input
                        type="text"
                        value={dep}
                        onChange={(e) => Course(e.target.value)}
                        id=""
                    />

                <div className="P_schedule">
                    <Button
                        color="blue"
                        // type="button" primary
                        onClick={() => FindCourse()}
                    >Submit</Button>
                </div>
            </form>
               
            </div>

            <div className="content_schedule"> <HelpSchedule AddCourse = {AddCourse}/> </div>
        </div>
        
    )
    return (
        <div className="content_schedule">
            <div className="H1_schedule"> Schedule</div>
                {out}
                
        </div>  
    );
};

export default Schedule;
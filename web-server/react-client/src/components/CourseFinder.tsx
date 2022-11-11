import React, { useState } from "react";
import httpClient from "./utility/httpClient";
import { Button } from 'semantic-ui-react'
import { Navigate } from "react-router-dom";
import Classmate from "./table/Classmate";

import "./CourseFinder.css"

const CourseFinder: React.FC = () => {
    const [dep, Course] = useState<string>("");
    const FindCourse = async () => {
        console.log(dep);
        try {
            const resp = await httpClient.post("//localhost:5000/courses", {
              dep,
            });
            console.log(resp.data);
        } catch (error: any) {
            if (error.response.status === 401) {
              alert("Invalid credentials");
            }
        }  
    };
    return (
        <div className="content_finder">
            <div className="P_finder"> Find your classmates ! </div>
                <form>
                    <div className="P_finder">
                        <label className='P_finder'> Type the Course Name (e.g. CS124): </label>
                        <input
                            type="text"
                            value={dep}
                            onChange={(e) => Course(e.target.value)}
                            id=""
                        />
                    </div>

                    <div className="P_finder">
                        <Button 
                            color="blue"
                            // type="button" primary
                            onClick={() => FindCourse()}
                        >Submit</Button>
                    </div>
                </form>
            <div className="content_finder"> <Classmate/> </div>
        </div>  
    );
};

export default CourseFinder;
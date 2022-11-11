import React, { useState, useEffect } from "react";
import httpClient from "./utility/httpClient"
import { User } from "./utility/types";
import { Button } from 'semantic-ui-react'

import './LoginPage.css'

const LoginPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    const logoutUser = async () => {
      await httpClient.post("//localhost:5000/logout");
      window.location.href = "/";
    };
  
    useEffect(() => {
      (async () => {
        try {
          const resp = await httpClient.get("//localhost:5000/@me");
          setUser(resp.data);
        } catch (error) {
          console.log("Not authenticated");
        }
      })();
    }, []);
  
    return (
      <div className="container_login">
        <div className="H1_login"> Welcome to this React Application </div>
        
        {user != null ? (
          <div className="container_login">
            <div className="P_login"> Logged in </div>
            <div className="P_login"> Unique ID: {user.id} </div>
            <div className="P_login"> Email: {user.email} </div>

            <div className="P_login">
            <Button onClick={logoutUser}> Logout </Button>
            </div>
          </div>
        ) : (
          <div className="container_login">
            <div className="P_login">You are not logged in</div>
            <div className="P_login">
              <a href="/authentication">
                <Button color="blue">Login</Button>
              </a>
              <a href="/register">
                <Button color="grey">Register</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    );

};

export default LoginPage;
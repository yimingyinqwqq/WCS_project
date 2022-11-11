import React, { useState } from "react";
import httpClient from "../utility/httpClient";
import { Button } from 'semantic-ui-react'
import { Navigate } from "react-router-dom";

import './AuthenticationPage.css';

const AuthenticationPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("//localhost:5000/authentication", {
        email,
        password,
      });

      window.location.href = "/";
      <Navigate to='/' ></Navigate>

    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="content_signin">
      <div className='P_signin'> Log Into Your Account </div>
      <form>
        <div className="P_signin">
          <label className='P_signin'> Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
          />
        </div>
        <div className="P_signin">
          <label className='P_signin'> Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id=""
          />
        </div>

        <div className="P_signin">
          <Button type="button" primary
                  onClick={() => logInUser()}
                  
          > Submit </Button>
        </div>

      </form>
    </div>
  );
};

export default AuthenticationPage;